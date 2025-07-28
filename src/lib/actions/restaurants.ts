import {sdk} from "../config";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CreateRestaurantDTO, RestaurantDTO, RestaurantProductDTO, UpdateRestaurantDTO} from "../../types/restaurant";
import {getAuthHeaders} from "../data";
import {useIonToast} from "@ionic/react";
import {useHistory} from "react-router-dom";

// Note: File saving logic (`saveFile`) is inherently server-side or requires
// a different approach for client-side file uploads (e.g., uploading to a
// cloud storage service). The current `saveFile` function is removed, and
// the `createProduct` mutation assumes the image is handled separately
// (e.g., pre-uploaded and a URL is provided).


export const useRestaurantActions = () => {
  const queryClient = useQueryClient();
  const [presentToast] = useIonToast();
  const history = useHistory();

  const createRestaurantMutation = useMutation({
    mutationFn: async (restaurantData: CreateRestaurantDTO) => {

      const formData = new FormData();
      // Append all fields from restaurantData to FormData
      Object.entries(restaurantData).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value); // For file uploads
        } else {
          formData.append(key, String(value)); // For other fields
        }
      });
      const headers = await getAuthHeaders();
      return await sdk.client.fetch<{ restaurant: RestaurantDTO }
      >("/store/restaurants", {
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': null,
          ...headers,
        },
      });
    },
    onSuccess: async ({restaurant}: { restaurant: RestaurantDTO }) => {
      // Invalidate or update relevant queries, e.g., restaurant list
      await queryClient.invalidateQueries({queryKey: ["restaurants"]});
      queryClient.setQueryData(["restaurant", restaurant.id], restaurant);
      await presentToast({
        message: 'Store created successfully!',
        duration: 2000,
        color: 'success',
      });
      history.push('/profile');
    },
    onError: async (error) => {
      console.error("Error creating restaurant:", error);
      await presentToast({
        message: 'Failed to create store. Please try again.',
        duration: 2000,
        color: 'danger',
      });
    },
  })


  const updateRestaurantMutation = useMutation({
    mutationFn: async (restaurantData: UpdateRestaurantDTO) => {

      const formData = new FormData();
      // Append all fields from restaurantData to FormData
      Object.entries(restaurantData).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value); // For file uploads
        } else {
          formData.append(key, String(value)); // For other fields
        }
      });
      const headers = await getAuthHeaders();
      return await sdk.client.fetch<{ restaurant: RestaurantDTO }
      >(`/store/restaurants/${restaurantData.id}`, {
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': null,
          ...headers,
        },
      });
    },
    onSuccess: async ({restaurant}: { restaurant: RestaurantDTO }) => {
      // Invalidate or update relevant queries, e.g., restaurant list
      console.log("sucessfully updated restaurant", restaurant);
      await queryClient.invalidateQueries({queryKey: ["restaurants"]});
      queryClient.setQueryData(["restaurant", restaurant.id], restaurant);
      await presentToast({
        message: 'Store updated successfully!',
        duration: 2000,
        color: 'success',
      });
      history.push('/profile');
    },
    onError: async (error) => {
      console.error("Error updating restaurant:", error);
      await presentToast({
        message: 'Failed to update store. Please try again.',
        duration: 2000,
        color: 'danger',
      });
    },
  })

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
      const {restaurant_product} = await sdk.client.fetch<{
        restaurant_product: RestaurantProductDTO;
      }>(`/store/restaurants/${restaurantId}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({products: [productData]}),
      });
      return restaurant_product;
    },
    onSuccess: async () => {
      // Invalidate product lists and potentially restaurant details
      await queryClient.invalidateQueries({queryKey: ["products"]});
      await queryClient.invalidateQueries({queryKey: ["restaurants"]}); // If restaurant data includes products
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
        body: JSON.stringify({product_ids: [productId]}),
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      return true; // Indicate success
    },
    onSuccess: async () => {
      // Invalidate product lists and potentially restaurant details
      await queryClient.invalidateQueries({queryKey: ["products"]});
      await queryClient.invalidateQueries({queryKey: ["restaurants"]}); // If restaurant data includes products
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      throw new Error("Error deleting product"); // Re-throw to allow component to handle
    },
  });
  return {
    createRestaurant: createRestaurantMutation.mutateAsync,
    updateRestaurant: updateRestaurantMutation.mutateAsync,
    createProduct: createProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
  };
};

