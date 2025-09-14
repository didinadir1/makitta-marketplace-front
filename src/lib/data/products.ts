import {sdk} from "../config";
import {useQuery} from "@tanstack/react-query";
import {Product} from "../../types/product";


export async function retrieveProductsByRestaurantId(
  restaurantId: string
): Promise<Product[]> {
  const {products}: { products: Product[] } = await sdk.client.fetch(
    `/store/restaurants/${restaurantId}/products`,
    {
      method: "GET",
    }
  );
  return products;
}

export default function useProduct(restaurantId: string) {
  return useQuery<Product[] | null>({
    queryKey: ["products", restaurantId],
    queryFn: () => retrieveProductsByRestaurantId(restaurantId),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    enabled: !!restaurantId, // Only run if restaurantId is provided
  })
}

