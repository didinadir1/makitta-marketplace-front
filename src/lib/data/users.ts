import {sdk} from "../config";
import {getAuthHeaders} from "./sessions";
import {useQuery} from "@tanstack/react-query";
import {User} from "../../types/user";

async function retrieveUser() {
  try {
    const {user} = await sdk.client.fetch<{
      user: User
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
    getUser: useQuery<User | null>({
      queryKey: ["user"],
      queryFn: retrieveUser,
      staleTime: 1000 * 60 * 15, // 15 minutes
    })
  }
}

