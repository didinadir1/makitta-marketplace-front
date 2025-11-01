import {sdk} from "../config";
import {useQuery} from "@tanstack/react-query";
import {ProductDTO} from "@medusajs/types";
import {Product} from "../../types/product";


export async function retrieveProduct(
  productId: string,
  params?: Record<string, string>
): Promise<Product> {
  const query = new URLSearchParams(params).toString();

  const {product}: { product: ProductDTO } = await sdk.client.fetch(
    `/store/products/${productId}?${query}`,
    {
      method: "GET",
    }
  );
  return new Product(product);
}

export async function retrieveProductsByRestaurantId(
  restaurantId: string,
): Promise<Product[]> {
  const {products}: { products: ProductDTO[] } = await sdk.client.fetch(
    `/store/restaurants/${restaurantId}/products`,
    {
      method: "GET",
    }
  );
  return products.map(productData => new Product(productData));
}

export async function listProducts(
  params?: Record<string, string>
): Promise<Product[]> {
  const query = new URLSearchParams(params).toString();

  const {products}: { products: ProductDTO[] } =
    await sdk.client.fetch(`/store/products?${query}`, {
      method: "GET",
    });
  return products.map(productData => new Product(productData));
}

export default function useProducts(productId?: string, params?: Record<string, string>, restaurantId?: string) {
  const getAllProducts = useQuery<Product[] | null>({
    queryKey: ["products", params],
    queryFn: () => listProducts(params),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  })
  const getProductsByRestaurantId = useQuery<Product[] | null>({
    queryKey: ["products", "restaurant", restaurantId],
    queryFn: () => retrieveProductsByRestaurantId(restaurantId ?? ""),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    enabled: !!restaurantId, // Only run if restaurantId is provided
  })
  const getProduct = useQuery<Product | null>({
    queryKey: ["product", productId],
    queryFn: () => retrieveProduct(productId ?? "", params),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    enabled: !!productId, // Only run if productId is provided
  })
  return {getAllProducts, getProductsByRestaurantId, getProduct}
}

export function useProduct(productId?: string, params?: Record<string, string>) {
  return useQuery<Product | null>({
    queryKey: ["product", productId],
    queryFn: () => retrieveProduct(productId ?? "", params),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    enabled: !!productId, // Only run if productId is provided
  })
}

