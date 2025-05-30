import { sdk } from "../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RestaurantDTO, RestaurantProductDTO } from "../../types/restaurant";
import {getAuthHeaders} from "../data";

// Note: File saving logic (`saveFile`) is inherently server-side or requires
// a different approach for client-side file uploads (e.g., uploading to a
// cloud storage service). The current `saveFile` function is removed, and
// the `createProduct` mutation assumes the image is handled separately
// (e.g., pre-uploaded and a URL is provided).


export const useRestaurantActions = () => {
  const queryClient = useQueryClient();

  const setRestaurantStatusMutation = useMutation({
    mutationFn: async ({
      restaurantId,
      status,
    }: {
      restaurantId: string;
      status: boolean;
    }) => {
      const headers = await getAuthHeaders();
      const { restaurant } = await sdk.client.fetch<{
        restaurant: RestaurantDTO;
      }>(`/restaurants/${restaurantId}/status`, {
        method: "POST",
        body: JSON.stringify({ is_open: status }),
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      return restaurant;
    },
    onSuccess: (updatedRestaurant) => {
      // Invalidate or update relevant queries, e.g., restaurant details
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      queryClient.setQueryData(
        ["restaurant", updatedRestaurant.id],
        updatedRestaurant
      );
    },
    onError: (error) => {
      console.error("Error setting restaurant status:", error);
    },
  });

const createProductMutation = useMutation({
    mutationFn: async ({
      restaurantId,
      productData,
    }: {
      restaurantId: string;
      productData: Record<string, any>; // Adjust type based on actual product data structure
    }) => {
      // Note: File upload needs to be handled separately before calling this mutation.
      // The `productData` should include the image URL if applicable.

      const headers = await getAuthHeaders();
      const { restaurant_product } = await sdk.client.fetch<{
        restaurant_product: RestaurantProductDTO;
      }>(`/store/restaurants/${restaurantId}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({ products: [productData] }),
      });
      return restaurant_product;
    },
    onSuccess: () => {
      // Invalidate product lists and potentially restaurant details
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["restaurants"] }); // If restaurant data includes products
    },
    onError: (error) => {
      console.error("Error creating product:", error);
    },
  });

const deleteProductMutation = useMutation({
    mutationFn: async ({
      productId,
      restaurantId,
    }: {
      productId: string;
      restaurantId: string;
    }) => {
      const headers = await getAuthHeaders();
      await sdk.client.fetch(`/restaurants/${restaurantId}/products`, {
        method: "DELETE",
        body: JSON.stringify({ product_ids: [productId] }),
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      return true; // Indicate success
    },
    onSuccess: () => {
      // Invalidate product lists and potentially restaurant details
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["restaurants"] }); // If restaurant data includes products
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      throw new Error("Error deleting product"); // Re-throw to allow component to handle
    },
  });
  return {
    setRestaurantStatus: setRestaurantStatusMutation.mutate,
    createProduct: createProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
  };
};

