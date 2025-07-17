import {sdk} from "../config";
import {RestaurantDTO} from "../../types/restaurant";
import {useQuery} from "@tanstack/react-query";


export async function retrieveRestaurant(
  restaurantId: string
): Promise<RestaurantDTO> {
  const {restaurant}: { restaurant: RestaurantDTO } = await sdk.client.fetch(
    `/store/restaurants/${restaurantId}`,
    {
      method: "GET",
    }
  );

  return restaurant;
}

export async function listRestaurants(
  filter?: Record<string, string>
): Promise<RestaurantDTO[]> {
  const query = new URLSearchParams(filter).toString();

  const {restaurants}: { restaurants: RestaurantDTO[] } =
    await sdk.client.fetch(`/store/restaurants?${query}`, {
      method: "GET",
    });

  return restaurants;
}

export async function retrieveRestaurantByHandle(
  handle: string
): Promise<RestaurantDTO> {
  const {restaurants}: { restaurants: RestaurantDTO[] } =
    await sdk.client.fetch(`/store/restaurants?handle=${handle}`, {
      method: "GET",
    });

  return restaurants[0];
}

export default function useRestaurant(restaurantId: string) {
  return {
    getRestaurant: useQuery<RestaurantDTO | null>({
      queryKey: ["restaurant", restaurantId],
      queryFn: () => retrieveRestaurant(restaurantId),
      staleTime: 1000 * 60 * 15, // 15 minutes
      enabled: !!restaurantId, // Only run if restaurantId is provided
    })
  };
}

