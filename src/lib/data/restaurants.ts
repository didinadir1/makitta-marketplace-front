import {sellerSdk} from "../config";
import {RestaurantDTO} from "../../types/restaurant";
import {useQuery} from "@tanstack/react-query";


export async function retrieveRestaurant(
  restaurantId: string
): Promise<RestaurantDTO> {
  const {restaurant}: { restaurant: RestaurantDTO } = await sellerSdk.client.fetch(
    `/store/restaurants/${restaurantId}`,
    {
      method: "GET",
    }
  );

  return new RestaurantDTO(restaurant)
}

export async function listRestaurants(
  filter?: Record<string, string>
): Promise<RestaurantDTO[]> {
  const query = new URLSearchParams(JSON.stringify(filter)).toString();

  const {restaurants}: { restaurants: RestaurantDTO[] } =
    await sellerSdk.client.fetch(`/store/restaurants?${query}`, {
      method: "GET",
    });


  return restaurants.map((restaurantData) => new RestaurantDTO(restaurantData));
}

export async function retrieveRestaurantByHandle(
  handle: string
): Promise<RestaurantDTO> {
  const {restaurants}: { restaurants: RestaurantDTO[] } =
    await sellerSdk.client.fetch(`/store/restaurants?handle=${handle}`, {
      method: "GET",
    });

  return new RestaurantDTO(restaurants[0]);
}

export default function useRestaurant(restaurantId?: string) {
  return useQuery<RestaurantDTO | null>({
    queryKey: ["restaurant", restaurantId],
    queryFn: () => retrieveRestaurant(restaurantId ?? ""),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    enabled: !!restaurantId, // Only run if restaurantId is provided

  })
}

export function useRestaurants(filter?: Record<string, any>) {
  return useQuery<RestaurantDTO[]>({
    queryKey: ["restaurants", filter],
    queryFn: () => listRestaurants(filter),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
}

