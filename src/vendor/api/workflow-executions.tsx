import {QueryKey, useQuery, UseQueryOptions} from "@tanstack/react-query"
import {sellerSdk} from "../../lib/config";
import {queryKeysFactory} from "../utils/query-key-factory"
import {HttpTypes} from "@medusajs/types"
import {FetchError} from "@medusajs/js-sdk"

const WORKFLOW_EXECUTIONS_QUERY_KEY = "workflow_executions" as const
export const workflowExecutionsQueryKeys = queryKeysFactory(
  WORKFLOW_EXECUTIONS_QUERY_KEY
)

export const useWorkflowExecutions = (
  query?: HttpTypes.AdminGetWorkflowExecutionsParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminGetWorkflowExecutionsParams,
      FetchError,
      HttpTypes.AdminWorkflowExecutionListResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  const {data, ...rest} = useQuery({
    queryFn: () => sellerSdk.admin.workflowExecution.list(query),
    queryKey: workflowExecutionsQueryKeys.list(query),
    ...options,
  })

  return {...data, ...rest}
}

export const useWorkflowExecution = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminWorkflowExecutionResponse,
      FetchError,
      HttpTypes.AdminWorkflowExecutionResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  const {data, ...rest} = useQuery({
    queryFn: () => sellerSdk.admin.workflowExecution.retrieve(id),
    queryKey: workflowExecutionsQueryKeys.detail(id),
    ...options,
  })

  return {...data, ...rest}
}
