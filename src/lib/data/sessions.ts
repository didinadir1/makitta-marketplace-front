import {medusaStorage} from "../config";
import {useQueryClient} from "@tanstack/react-query";

const JWT_TOKEN_KEY = "_jwt";

const createSession = async (token: string) => {
  if (!token) {
    return;
  }
  // In a real app, you might want to store expiration time too
  await medusaStorage.set(JWT_TOKEN_KEY, token);
};

const retrieveSession = async () => {
  const token = await medusaStorage.get(JWT_TOKEN_KEY);
  return token ? token : null;
};

const destroySession = async () => {
  await medusaStorage.remove(JWT_TOKEN_KEY);
};

// Helper to get auth headers from stored token
export const getAuthHeaders = async (): Promise<{ authorization: string } | {}> => {
  const token = await retrieveSession();
  return token ? {Authorization: `Bearer ${token}`} : {};
};

export const useSession = () => {

  const queryClient = useQueryClient();
  return {
    createSession: async (token: string) => {
      await createSession(token);
      await queryClient.invalidateQueries({queryKey: ["user"]});
    },
    retrieveSession,
    destroySession: async () => {
      await destroySession();
      await queryClient.invalidateQueries({queryKey: ["user"]});
    },
  };


}