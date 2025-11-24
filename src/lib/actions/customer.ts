import {customerSdk, fetchQuery, sellerSdk} from "../config";
import {useMutation, UseMutationOptions, useQueryClient} from "@tanstack/react-query";
import {CreateUserDTO, UserRole} from "../../types/user";
import {FetchError} from "@medusajs/js-sdk";
import {useCart} from "./carts";
import {useHistory} from "react-router-dom";
import {getAuthHeaders, useSession} from "../data";
import {GoogleLoginResponseOnline, SocialLogin} from "@capgo/capacitor-social-login";
import {useIonToast} from "@ionic/react";
import {
  HttpTypes,
  StoreCreateCustomerAddress,
  StoreCustomerAddressDeleteResponse,
  StoreCustomerResponse
} from "@medusajs/types";
import {useSignInWithEmailPass} from "../../vendor/api";


export interface SignupFormData {
  email: string
  first_name: string
  last_name: string
  phone: string
  password: string
  actor_type: UserRole
}

export interface LoginFormData {
  email: string
  password: string
  provider?: string
}

export const useAuth = () => {

  const {createSession, destroySession} = useSession()
  const queryClient = useQueryClient();
  const history = useHistory(); // For client-side navigation
  const {transferCart} = useCart(); // Assuming transferCart is also a hook/mutation
  const [presentToast] = useIonToast();

  const signup = async (data: SignupFormData) => {
    const {
      actor_type,
      password,
      last_name,
      first_name,
      phone,
      email
    } = data;

    try {
      // Register the user identity
      await customerSdk.auth.register("customer", "emailpass", {
        email: email,
        password: password,
      });

      await createUser({
        email,
        first_name,
        last_name,
        phone,
        actor_type,
      });

      await customerSdk.auth.login(actor_type, "emailpass", {
        email,
        password,
      });

      transferCart(); // Transfer cart after successful login

    } catch (error) {
      const fetchError = error as FetchError;

      if (
        fetchError.statusText !== "Unauthorized" ||
        fetchError.message !== "Identity with email already exists"
      ) {
        console.error(`An error occured while creating account: ${fetchError}`);
        await presentToast({
          message: 'Failed to sign up. Please try again.',
          duration: 2000,
          color: 'danger',
        });
        throw new Error("An error occurred during signup.");
      }

      // Handle existing identity case - attempt to log in
      // todo send verification email link in this case (email already exists)
      try {
        const loginResponse = await customerSdk.auth.login(actor_type, "emailpass", {
          email,
          password,
        });
        if (!loginResponse) {
          return
        }
        if (typeof loginResponse !== "string") {
          await presentToast({
            message: 'Failed to sign up. Please try again.',
            duration: 2000,
            color: 'danger',
          });
          throw new Error(
            "Authentication requires more actions, which isn't supported by this flow."
          );
        }
        // await transferCart(); // Transfer cart after successful login
      } catch (loginError) {
        console.error("Error logging in existing user:", loginError);
        await presentToast({
          message: 'Failed to sign up. Please try again.',
          duration: 2000,
          color: 'danger',
        });
        throw new Error("An error occurred during login.");
      }
    }
    history.push(getRedirectPath(actor_type))
  };

  const login = async (data: LoginFormData) => {
    const {email, password, provider} = data;

    try {
      const response: {
        token?: string; actorType?: UserRole;
        location?: string;
        profile?: {
          email: string;
          first_name?: string;
          last_name?: string;
        }
        verifyPassword?: boolean;
      } =
        await customerSdk.client.fetch("/auth/login", {
          method: "POST",
          body: {
            email,
            password,
            provider: provider ?? "emailpass",
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

      if (response && response.verifyPassword) {
        return response; // Return response to handle redirect in component
      }

      if (response && response.token) {
        await createSession(response.token);
        transferCart(); // Transfer cart after successful login

        return response;
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  }

  const loginWithGoogle = async () => {
    // Construct the callback URL client-side
    const {result} = await SocialLogin.login({
      provider: "google",
      options: {
        scopes: ['email', 'profile'],
      }
    }) as { result: GoogleLoginResponseOnline }
    if (result.idToken) {
      const response: {
        linkPrompt?: { originalMethod: string, existingAuthIdentityId: string },
        token?: string;
        actorType?: UserRole,
        profile?: {
          email: string;
          first_name?: string;
          last_name?: string;
        }
      } =
        await customerSdk.client.fetch("/auth/login/google", {
          method: "POST",
          body: {
            idToken: result.idToken,
            // todo: handle actorType dynamically based on user selection
            actorType: "restaurant"
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

      if (response.token) await createSession(response.token);

      return response;
    }

  }

  return {
    signup,
    login,
    loginWithGoogle,
  }
};


export const useSignUpWithEmailPass = (
  options?: UseMutationOptions<
    string,
    FetchError,
    HttpTypes.AdminSignUpWithEmailPassword & {
    confirmed_password: string
    first_name: string,
    last_name: string,
    phone: string,
  }
  >
) => {

  const {mutateAsync: createCustomerMutation} = useCreateCustomer()
  const {mutateAsync: loginMutation} = useSignInWithEmailPass()

  return useMutation({
    mutationFn: (payload) => customerSdk.auth.register("customer", "emailpass", payload),
    onSuccess: async (data, variables, context) => {
      const customer = {
        first_name: variables.first_name,
        last_name: variables.last_name,
        phone: variables.phone,
        email: variables.email,
      }
      await createCustomerMutation({...customer}, {
          onSuccess: async () => {
            options?.onSuccess?.(data, variables, context)
          },
          onError: async (error) => {
            options?.onError?.(error, variables, context)
          }
        }
      )
    },
    onError: async (error, variables, context) => {

      if (
        error.statusText !== "Unauthorized" ||
        error.message !== "Identity with email already exists"
      ) {
        throw new Error("An error occurred during signup.");
      }

      // Handle existing identity case - attempt to log in
      // todo send verification email link in this case (email already exists)
      const email = variables.email;
      const password = variables.password;

      const loginResponse = await loginMutation({email, password}, {
        onSuccess: async (data) => {
          if (typeof data === "string") options?.onSuccess?.(data, variables, context)
        },
        onError: async (error) => {
          options?.onError?.(error, variables, context)
        }
      })

      if (typeof loginResponse !== "string") {
        throw new Error(
          "Authentication requires more actions, which isn't supported by this flow."
        );
      }
      // await transferCart(); // Transfer cart after successful login
    },
    ...options,
  })
}

export const useLogInWithEmailPass = (
  options?: UseMutationOptions<
    | string
    | {
    location: string
  },
    FetchError,
    HttpTypes.AdminSignInWithEmailPassword & { actor_type: UserRole }
  >
) => {
  return useMutation({
    mutationFn: (payload) => {
      if (payload.actor_type === "seller")
        return sellerSdk.auth.login("seller", "emailpass", payload)
      return customerSdk.auth.login("customer", "emailpass", payload)
    },
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useLogInWithGoogle = (
  options?: UseMutationOptions<
    {
      originalProvider?: string,
      customerToken?: string;
      sellerToken?: string;
      profile?: {
        email: string;
        first_name?: string;
        last_name?: string;
      }
    },
    FetchError,
    { idToken: string }
  >
) => {

  return useMutation({
    mutationFn: (payload) =>
      fetchQuery("/auth/google", {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useLinkGoogleAccount = (
  options?: UseMutationOptions<
    {
      customerToken?: string;
      sellerToken?: string;
    },
    FetchError,
    { email: string, password: string, idToken: string; }
  >
) => {

  return useMutation({
    mutationFn: (payload) =>
      fetchQuery("/auth/google/link-account", {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}


export const useLogout = (options?: UseMutationOptions<void, FetchError>) => {
  return useMutation({
    mutationFn: () => customerSdk.auth.logout(),
    ...options,
  })
}

export const useCreateCustomer = (
  options?: UseMutationOptions<
    StoreCustomerResponse,
    FetchError,
    HttpTypes.StoreCreateCustomer
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      customerSdk.store.customer.create(payload),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useAddCustomerAddress = (
  options?: UseMutationOptions<
    StoreCustomerResponse,
    FetchError,
    StoreCreateCustomerAddress
  >
) => {

  return useMutation({
    mutationFn: (payload) =>
      customerSdk.store.customer
        .createAddress(payload),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteCustomerAddress = (
  options?: UseMutationOptions<
    StoreCustomerAddressDeleteResponse,
    FetchError,
    string
  >
) => {

  return useMutation({
    mutationFn: (payload) =>
      customerSdk.store.customer
        .deleteAddress(payload),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateCustomerAddress = (
  options?: UseMutationOptions<
    StoreCustomerResponse,
    FetchError,
    HttpTypes.StoreUpdateCustomerAddress & { addressId: string }
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      customerSdk.store.customer
        .updateAddress(payload.addressId, payload),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useResetPasswordForEmailPass = (
  options?: UseMutationOptions<void, FetchError, { email: string }>
) => {
  return useMutation({
    mutationFn: (payload) =>
      customerSdk.auth.resetPassword("customer", "emailpass", {
        identifier: payload.email,
      }),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateProviderForEmailPass = (
  token: string,
  options?: UseMutationOptions<void, FetchError, { password: string }>
) => {
  return useMutation({
    mutationFn: (payload) =>
      customerSdk.auth.updateProvider("customer", "emailpass", payload, token),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}


// Function to create a driver (can be called from a mutation)
export const createUser = async (input: CreateUserDTO) => {
  const headers = await getAuthHeaders();
  return await customerSdk.client.fetch("/store/users", {
    method: "POST",
    body: input,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};

export const getRedirectPath = (actorType?: UserRole): string => {
  // switch (actorType) {
  //   case "restaurant":
  //     return "/dishes"; // Example path for restaurant admin
  //   case "driver":
  //     return "/dishes"; // Example path for driver
  //   default:
  //     return "/dishes"; // Default path for customer
  // }
  return "/dishes";
};
