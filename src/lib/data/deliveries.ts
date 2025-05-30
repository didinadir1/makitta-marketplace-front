import { sdk } from "../config";
import {DeliveryDTO} from "../../types/delivery";
import {getAuthHeaders} from "./sessions";
import {useQuery} from "@tanstack/react-query";


async function listDeliveries(
  filter?: Record<string, string>
): Promise<DeliveryDTO[]> {
  const { deliveries }: { deliveries: DeliveryDTO[] } = await sdk.client.fetch(
    "/store/deliveries",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...await getAuthHeaders(),
      },
    }
  );

  return deliveries;
}

async function retrieveDelivery(
  deliveryId: string
): Promise<DeliveryDTO> {
  const { delivery }: { delivery: DeliveryDTO } = await sdk.client.fetch(
    `/store/deliveries/${deliveryId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...await getAuthHeaders(),
      },
    }
  );
  return delivery;
}

export function useDeliveries() {
  return {
    listDeliveries: useQuery({
      queryKey: ["deliveries"],
      queryFn: () => listDeliveries(),
      staleTime: 1000 * 60 * 15, // 15 minutes
    }),
    retrieveDelivery: (deliveryId: string) => useQuery({
      queryKey: ["delivery", deliveryId],
      queryFn: () => retrieveDelivery(deliveryId),
      staleTime: 1000 * 60 * 15, // 15 minutes
      enabled: !!deliveryId, // Only run if deliveryId is provided
    }),
  }
}
