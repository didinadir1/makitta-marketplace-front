import {sdk} from "../config";
import {getAuthHeaders} from "./sessions";
import {useQuery} from "@tanstack/react-query";
import {RestaurantAdminDTO} from "../../types/user";

async function retrieveUser() {
  try {
    const {user} = await sdk.client.fetch<{
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
  return {
    getUser: useQuery<RestaurantAdminDTO | null>({
      queryKey: ["user"],
      queryFn: retrieveUser,
      staleTime: 1000 * 60 * 15, // 15 minutes
    })
  }
}

