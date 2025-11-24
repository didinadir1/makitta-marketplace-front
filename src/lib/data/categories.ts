import {HttpTypes} from "@medusajs/types";
import {sellerSdk} from "../config";
import {getAuthHeaders} from "./sessions";
import {useQuery} from "@tanstack/react-query";

async function listCategories(): Promise<
  HttpTypes.StoreProductCategory[]
> {
  const {product_categories} = await sellerSdk.store.category.list(
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