import {sdk} from "../config";
import {useQueryClient} from "@tanstack/react-query";
import {CreateUserDTO, UserRole} from "../../types/user";
import {FetchError} from "@medusajs/js-sdk";
import {useCart} from "./carts";
import {useHistory} from "react-router-dom";
import {getAuthHeaders, useSession} from "../data";
import {GoogleLoginResponseOnline, SocialLogin} from "@capgo/capacitor-social-login";
import {useIonToast} from "@ionic/react";


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
      const token = await sdk.auth.register(actor_type, "emailpass", {
        email: email,
        password: password,
      });

      await createSession(token)

      await createUser({
        email,
        first_name,
        last_name,
        phone,
        actor_type,
      });

      // Log in the newly created user
      const loginToken = await sdk.auth.login(actor_type, "emailpass", {
        email: email,
        password,
      });

      await createSession(loginToken as string);
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
        const loginResponse = await sdk.auth.login(actor_type, "emailpass", {
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
        await createSession(loginResponse);
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
        await sdk.client.fetch("/auth/login", {
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
        token?: string;
        actorType?: UserRole,
        profile?: {
          email: string;
          first_name?: string;
          last_name?: string;
        }
        verifyPassword?: boolean;
      } =
        await sdk.client.fetch("/auth/login/google", {
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
      transferCart();

      return response;
    }

  }

  const logout = async () => {
    await SocialLogin.logout({provider: "google"});
    await destroySession();
    // You might also want to clear the cart on logout depending on requirements
    // await clearCart(); // Assuming clearCart is available
    queryClient.invalidateQueries({queryKey: ["user"]}); // Invalidate user query
    queryClient.invalidateQueries({queryKey: ["cart"]}); // Invalidate cart query
    history.push("/");
  }

  return {
    signup,
    login,
    loginWithGoogle,
    logout,
  }
};


// Function to create a driver (can be called from a mutation)
export const createUser = async (input: CreateUserDTO) => {
  const headers = await getAuthHeaders();
  return await sdk.client.fetch("/store/users", {
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
