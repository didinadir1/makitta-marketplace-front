import {FetchError} from "@medusajs/js-sdk"
import {HttpTypes} from "@medusajs/types"
import {QueryKey, useMutation, UseMutationOptions, useQuery, UseQueryOptions,} from "@tanstack/react-query"
import {fetchQuery, medusaStorage, SELLER_JWT_KEY} from "../../lib/config";
import {queryClient} from "../../lib/utils/query-client"
import {queryKeysFactory} from "../../lib/utils/query-key-factory"
import {StoreVendor, TeamMemberCreateProps, TeamMemberProps} from "../types/user";

export const SELLER_USERS_QUERY_KEY = "seller-users" as const
export const sellerUsersQueryKeys = {
  ...queryKeysFactory(SELLER_USERS_QUERY_KEY),
  me: () => [SELLER_USERS_QUERY_KEY, "me"],
}

export const useSellerMe = (
  options?: UseQueryOptions<
    HttpTypes.AdminUserResponse,
    FetchError,
    HttpTypes.AdminUserResponse & {
    seller: StoreVendor
  },
    QueryKey
  >
) => {
  const {data, ...rest} = useQuery({
    queryFn: async () =>
      fetchQuery("/vendor/sellers/me", {
        method: "GET",
        query: {
          fields:
            "id,name,description,phone,email,media,address_line,postal_code,country_code,city,region,metadata,tax_id,photo,store_status",
        },
      }),
    queryKey: sellerUsersQueryKeys.me(),
    ...options,
  })

  return {
    seller: data?.seller,
    ...rest,
  }
}

export const useSellerCreate = (
  options?: UseMutationOptions<
    HttpTypes.AdminStoreResponse & { sellerToken: string },
    FetchError,
    StoreVendor & { member: TeamMemberCreateProps }
  >
) => {
  return useMutation({
    mutationFn: (body) =>
      fetchQuery("/store", {
        method: "POST",
        body,
      }),
    onSuccess: async (data, variables, context) => {
      await medusaStorage.set(SELLER_JWT_KEY, data.sellerToken);

      await queryClient.invalidateQueries({
        queryKey: sellerUsersQueryKeys.lists(),
      });

      await queryClient.invalidateQueries({
        queryKey: sellerUsersQueryKeys.me(),
      })

      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useSellerUpdateMe = (
  options?: UseMutationOptions<
    HttpTypes.AdminUserResponse,
    FetchError,
    StoreVendor,
    QueryKey
  >
) => {
  return useMutation({
    mutationFn: (body) =>
      fetchQuery("/vendor/sellers/me", {
        method: "POST",
        body,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: sellerUsersQueryKeys.lists(),
      })

      queryClient.invalidateQueries({
        queryKey: sellerUsersQueryKeys.me(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useSellerOnboarding = () => {
  const {data, ...rest} = useQuery({
    queryFn: () =>
      fetchQuery("/vendor/sellers/me/onboarding", {
        method: "GET",
      }),
    queryKey: ["onboarding"],
    staleTime: 0,
  })

  return {
    ...data,
    ...rest,
  }
}

export const useSellerUpdateOnboarding = () => {
  return useMutation({
    mutationFn: () =>
      fetchQuery("/vendor/sellers/me/onboarding", {
        method: "POST",
        body: {},
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["onboarding"],
      })
    },
  })
}

export const useSellerUserMe = (
  query?: HttpTypes.AdminUserParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminUserResponse,
      FetchError,
      HttpTypes.AdminUserResponse & {
      member: TeamMemberProps
    },
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const {data, ...rest} = useQuery({
    queryFn: () =>
      fetchQuery(`/vendor/me`, {
        method: "GET",
        query: query as { [key: string]: string | number },
      }),
    queryKey: [SELLER_USERS_QUERY_KEY, "user", "me"],
    ...options,
  })

  return {...data, ...rest}
}

export const useSellerStatistics = ({from, to}: { from: string; to: string }) => {
  const {data, ...rest} = useQuery({
    queryFn: () =>
      fetchQuery(
        `/vendor/statistics?time_from=${from}T00:00:00Z&time_to=${to}T23:59:59Z`,
        {
          method: "GET",
        }
      ),
    queryKey: [SELLER_USERS_QUERY_KEY, "statistics"],
  })

  return {...data, ...rest}
}

export const useSellerUser = (
  id: string,
  query?: HttpTypes.AdminUserParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminUserResponse,
      FetchError,
      HttpTypes.AdminUserResponse & {
      member: TeamMemberProps
    },
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const {data, ...rest} = useQuery({
    queryFn: () =>
      fetchQuery(`/vendor/members/${id}`, {
        method: "GET",
        query: query as { [key: string]: string | number },
      }),
    queryKey: sellerUsersQueryKeys.detail(id),
    ...options,
  })

  return {...data, ...rest}
}

export const useSellerUsers = (
  query?: HttpTypes.AdminUserListParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminUserListResponse,
      FetchError,
      HttpTypes.AdminUserListResponse & { members: any[] },
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const {data, ...rest} = useQuery({
    queryFn: () =>
      fetchQuery("/vendor/members", {
        method: "GET",
        query: query as { [key: string]: string | number },
      }),
    queryKey: sellerUsersQueryKeys.list(query),
    ...options,
  })

  return {...data, ...rest}
}

export const useSellerUpdateUser = (
  id: string,
  options?: UseMutationOptions<
    TeamMemberProps,
    FetchError,
    {
      name?: string
      photo?: string
      language?: string
      phone?: string
      bio?: string
    },
    QueryKey
  >
) => {
  return useMutation({
    mutationFn: (body) =>
      fetchQuery(`/vendor/members/${id}`, {
        method: "POST",
        body,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: sellerUsersQueryKeys.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: sellerUsersQueryKeys.lists(),
      })

      // We invalidate the me query in case the user updates their own profile
      queryClient.invalidateQueries({
        queryKey: [SELLER_USERS_QUERY_KEY, "user", "me"],
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useSellerDeleteUser = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminUserDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      fetchQuery(`/vendor/members/${id}`, {
        method: "DELETE",
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: sellerUsersQueryKeys.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: sellerUsersQueryKeys.lists(),
      })

      // We invalidate the me query in case the user updates their own profile
      queryClient.invalidateQueries({
        queryKey: sellerUsersQueryKeys.me(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
