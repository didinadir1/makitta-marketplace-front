import {FetchError} from "@medusajs/js-sdk"
import {HttpTypes} from "@medusajs/types"
import {useMutation, UseMutationOptions} from "@tanstack/react-query"
import {fetchQuery, sellerSdk} from "../../lib/config";
import {queryClient} from "../../lib/utils/query-client";
import {sellerUsersQueryKeys} from "./users";

export const useSignInWithEmailPass = (
  options?: UseMutationOptions<
    | string
    | {
    location: string
  },
    FetchError,
    HttpTypes.AdminSignUpWithEmailPassword
  >
) => {
  return useMutation({
    mutationFn: (payload) => sellerSdk.auth.login("seller", "emailpass", payload),
    onSuccess: async (data, variables, context) => {
      await queryClient.refetchQueries({
        queryKey: sellerUsersQueryKeys.me(),
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useSignUpWithEmailPass = (
  options?: UseMutationOptions<
    string,
    FetchError,
    HttpTypes.AdminSignInWithEmailPassword & {
    confirmPassword: string
    name: string
  }
  >
) => {
  return useMutation({
    mutationFn: (payload) => sellerSdk.auth.register("seller", "emailpass", payload),
    onSuccess: async (_, variables) => {
      const seller = {
        name: variables.name,
        member: {
          name: variables.name,
          email: variables.email,
        },
      }
      await fetchQuery("/vendor/sellers", {
        method: "POST",
        body: seller,
      })
    },
    ...options,
  })
}

export const useSignUpForInvite = (
  options?: UseMutationOptions<
    string,
    FetchError,
    HttpTypes.AdminSignInWithEmailPassword
  >
) => {
  return useMutation({
    mutationFn: (payload) => sellerSdk.auth.register("seller", "emailpass", payload),
    ...options,
  })
}

export const useResetPasswordForEmailPass = (
  options?: UseMutationOptions<void, FetchError, { email: string }>
) => {
  return useMutation({
    mutationFn: (payload) =>
      sellerSdk.auth.resetPassword("seller", "emailpass", {
        identifier: payload.email,
      }),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useLogout = (options?: UseMutationOptions<void, FetchError>) => {
  return useMutation({
    mutationFn: () => sellerSdk.auth.logout(),
    ...options,
  })
}

export const useUpdateProviderForEmailPass = (
  token: string,
  options?: UseMutationOptions<void, FetchError, { password: string }>
) => {
  return useMutation({
    mutationFn: (payload) =>
      sellerSdk.auth.updateProvider("seller", "emailpass", payload, token),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
