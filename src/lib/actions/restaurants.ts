import {sdk} from "../config";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CreateRestaurantDTO, RestaurantDTO, UpdateRestaurantDTO} from "../../types/restaurant";
import {getAuthHeaders} from "../data";
import {useIonToast} from "@ionic/react";
import {useHistory} from "react-router-dom";


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

  return {
    createRestaurant: createRestaurantMutation.mutateAsync,
    updateRestaurant: updateRestaurantMutation.mutateAsync,
  };
};

