import {sdk} from "../config";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {RestaurantProductDTO} from "../../types/restaurant";
import {getAuthHeaders} from "../data";
import {useIonToast} from "@ionic/react";


export const useProductActions = () => {
  const queryClient = useQueryClient();
  const [presentToast] = useIonToast();

  const saveProductMutation = useMutation({
    mutationFn: async ({
                         restaurantId,
                         productData,
                       }: {
      restaurantId: string;
      productData: Record<string, any>; // Adjust type based on actual product data structure
    }) => {
      const formData = new FormData();

      Object.entries(productData).forEach(([key, value]) => {
        if (key === 'images' && Array.isArray(value)) {
          // Handle multiple images
          value.forEach((image) => {
            if (image instanceof File) {
              formData.append(`images`, image);
            }
          });
        } else if (value) {
          formData.append(key, JSON.stringify(value)); // For other fields
        }
      });


      const headers = await getAuthHeaders();
      // we save one product at a time
      await sdk.client.fetch<{
        createdProducts: RestaurantProductDTO[];
        updatedProducts: RestaurantProductDTO[];
      }>(`/store/restaurants/${restaurantId}/products`, {
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': null,
          ...headers,
        },
      });

      return {product_id: productData?.id, restaurant_id: restaurantId}

    },
    onSuccess: async (restaurantProduct: RestaurantProductDTO) => {
      console.log("Product saved successfully:", restaurantProduct);
      // Invalidate product lists and potentially restaurant details
      await queryClient.invalidateQueries({queryKey: ["products"]});
      await queryClient.invalidateQueries({queryKey: ["product", restaurantProduct.product_id]});
      await queryClient.invalidateQueries({queryKey: ["restaurant", restaurantProduct.restaurant_id]}); // If restaurant data includes products
      await presentToast({
        message: 'Product saved successfully!',
        duration: 2000,
        color: 'success',
      });
    },
    onError: async (error) => {
      console.error("Error saving product:", error);
      await presentToast({
        message: 'Failed to save the product. Please try again.',
        duration: 2000,
        color: 'danger',
      });
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
      await sdk.client.fetch(`store/restaurants/${restaurantId}/products`, {
        method: "DELETE",
        body: {product_ids: [productId]},
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
      await queryClient.invalidateQueries({queryKey: ["restaurant"]}); // If restaurant data includes products
      await presentToast({
        message: 'Product deleted successfully',
        duration: 1500,
        position: 'bottom',
        color: 'success',
      });
    },
    onError: async (error) => {
      console.error("Error deleting product:", error);
      await presentToast({
        message: 'Failed to delete the product. Please try again.',
        duration: 2000,
        color: 'danger',
      })
      throw new Error("Error deleting product"); // Re-throw to allow component to handle
    },
  });
  return {
    saveProduct: saveProductMutation.mutateAsync,
    deleteProduct: deleteProductMutation.mutateAsync,
  };
};

