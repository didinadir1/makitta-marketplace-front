import {useMutation, UseMutationOptions} from "@tanstack/react-query"

import {queryKeysFactory} from "../../lib/utils/query-key-factory"

import {HttpTypes} from "@medusajs/types"
import {sellerSdk} from "../../lib/config";
import {queryClient} from "../../lib/utils/query-client"
import {ordersQueryKeys} from "./orders"
import {FetchError} from "@medusajs/js-sdk"

const FULFILLMENTS_QUERY_KEY = "fulfillments" as const
export const fulfillmentsQueryKeys = queryKeysFactory(FULFILLMENTS_QUERY_KEY)

export const useCreateFulfillment = (
  options?: UseMutationOptions<any, FetchError, any>
) => {
  return useMutation({
    mutationFn: (payload: any) => sellerSdk.admin.fulfillment.create(payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({queryKey: fulfillmentsQueryKeys.lists()})
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.all,
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useCancelFulfillment = (
  id: string,
  options?: UseMutationOptions<any, FetchError, any>
) => {
  return useMutation({
    mutationFn: () => sellerSdk.admin.fulfillment.cancel(id),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({queryKey: fulfillmentsQueryKeys.lists()})
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.all,
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useCreateFulfillmentShipment = (
  fulfillmentId: string,
  options?: UseMutationOptions<
    { fulfillment: HttpTypes.AdminFulfillment },
    FetchError,
    HttpTypes.AdminCreateFulfillmentShipment
  >
) => {
  return useMutation({
    mutationFn: (payload: HttpTypes.AdminCreateFulfillmentShipment) =>
      sellerSdk.admin.fulfillment.createShipment(fulfillmentId, payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.all,
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
