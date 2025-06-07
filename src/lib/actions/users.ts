import {sdk} from "../config";
import {useQueryClient} from "@tanstack/react-query";
import {CreateDriverDTO, UserRole} from "../../types/user";
import {FetchError} from "@medusajs/js-sdk";
import {useCart} from "./carts";
import {useHistory} from "react-router-dom";
import {CreateRestaurantDTO} from "../../types/restaurant";
import {getAuthHeaders, useSession} from "../data";
import {GoogleLoginResponseOnline, SocialLogin} from "@capgo/capacitor-social-login";


export interface SignupFormData {
  email: string
  first_name: string
  last_name: string
  phone: string
  password: string
  user_type: UserRole
  restaurant_name?: string
  restaurant_address?: string
  restaurant_description?: string
  image_url?: string
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

  const signUp = async (data: SignupFormData) => {
    const {
      user_type,
      password,
      last_name,
      first_name,
      phone,
      email,
      restaurant_name,
      restaurant_address,
      restaurant_description,
      image_url,
    } = data;

    const actor_type = user_type;

    try {
      // Register the user identity
      const token = await sdk.auth.register(actor_type, "emailpass", {
        email: email,
        password: password,
      });

      await createSession(token)

      // Create the specific user type (customer, restaurant admin, driver)
      const headers = {
        ...(await getAuthHeaders()),
      };

      if (actor_type === "customer") {
        await sdk.store.customer.create(
          {
            email,
            first_name,
            last_name,
            phone,
          },
          {},
          headers
        );
      } else if (actor_type === "restaurant") {
        await createRestaurant({
          email,
          first_name,
          last_name,
          phone,
          name: restaurant_name!,
          address: restaurant_address!,
          description: restaurant_description,
          image_url,
        });
      } else if (actor_type === "driver") {
        await createDriver({
          email,
          first_name,
          last_name,
          phone,
        });
      }

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
        throw new Error("An error occurred during signup.");
      }

      // Handle existing identity case - attempt to log in
      try {
        const loginResponse = await sdk.auth.login("customer", "emailpass", {
          email,
          password,
        });
        if (!loginResponse) {
          return
        }
        if (typeof loginResponse !== "string") {
          throw new Error(
            "Authentication requires more actions, which isn't supported by this flow."
          );
        }

        await createSession(loginResponse);
        await transferCart(); // Transfer cart after successful login

        return {success: true, actorType: "customer" as UserRole}; // Assume customer if logging into existing identity
      } catch (loginError) {
        console.error("Error logging in existing user:", loginError);
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
    console.log("Google login result:", result);
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
            idToken: result.idToken
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
    signUp,
    login,
    loginWithGoogle,
    logout,
  }
};


// Function to create a driver (can be called from a mutation)
export const createDriver = async (input: CreateDriverDTO) => {
  const headers = await getAuthHeaders();
  return await sdk.client.fetch("/store/users", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};

// Function to create a restaurant (can be called from a mutation)
export const createRestaurant = async (input: CreateRestaurantDTO) => {
  const handle = input.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "")
    .replace(/^-/, "");

  const headers = await getAuthHeaders();
  return await sdk.client.fetch("/store/restaurants", {
    method: "POST",
    body: JSON.stringify({
      ...input,
      handle,
    }),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};


export const getRedirectPath = (actorType?: UserRole): string => {
  switch (actorType) {
    case "restaurant":
      return "/dashboard"; // Example path for restaurant admin
    case "driver":
      return "/dashboard"; // Example path for driver
    case "customer":
      return "/dishes";
    default:
      return "/"; // Default path for customer
  }
};
