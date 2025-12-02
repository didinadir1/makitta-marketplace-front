import {fetchQuery, sellerSdk} from "../config";
import {getAuthHeaders} from "./sessions";
import {QueryKey, useQuery, UseQueryOptions} from "@tanstack/react-query";
import {RestaurantAdminDTO} from "../../types/user";
import {HttpTypes} from "@medusajs/types";
import {FetchError} from "@medusajs/js-sdk";
import {queryKeysFactory} from "../utils/query-key-factory";

export async function retrieveUser() {
  try {
    const {user} = await sellerSdk.client.fetch<{
      user: RestaurantAdminDTO
    }>("/store/users/me", {
      headers: {
        ...await getAuthHeaders(),
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function useUser() {
  return useQuery<RestaurantAdminDTO | null>({
    queryKey: ["user"],
    queryFn: retrieveUser,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  })
}

const USERS_QUERY_KEY = "users" as const
const usersQueryKeys = {
  ...queryKeysFactory(USERS_QUERY_KEY),
  me: () => [USERS_QUERY_KEY, "me"],
}

export const useMe = (
  options?: UseQueryOptions<
    HttpTypes.AdminUserResponse,
    FetchError,
    { customer: HttpTypes.StoreCustomer },
    QueryKey
  >
) => {
  const {data, ...rest} = useQuery({
    queryFn: async () =>
      fetchQuery("/store/customers/me", {
        method: "GET",
        query: {
          fields:
            "*orders",
        },
      }),
    queryKey: usersQueryKeys.me(),
    ...options,
  })
  return {
    user: data?.customer,
    ...rest,
  }
}
