import {customerSdk, fetchQuery, sellerSdk} from "../config";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {UserRole} from "../../types/user";
import {FetchError} from "@medusajs/js-sdk";
import {
  HttpTypes,
  StoreCreateCustomerAddress,
  StoreCustomerAddressDeleteResponse,
  StoreCustomerResponse
} from "@medusajs/types";
import {useSignInWithEmailPass} from "../../vendor/api";

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
    onSuccess: async (data, variables, context) => {
      await sellerSdk.auth.logout()
      options?.onSuccess?.(data, variables, context)
    },
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
