import {HttpTypes} from "@medusajs/types";
import {sdk} from "../config";
import {getAuthHeaders} from "./sessions";
import {useQuery} from "@tanstack/react-query";

async function listCategories(): Promise<
  HttpTypes.StoreProductCategory[]
> {
  const {product_categories} = await sdk.store.category.list(
    {},
    {
      ...await getAuthHeaders(),
    }
  );

  return product_categories as HttpTypes.StoreProductCategory[];
}

export function useCategories() {
  return useQuery(
    {
      queryKey: ["categories"],
      queryFn: listCategories,
    }
  )
}