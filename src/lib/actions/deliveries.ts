import {sellerSdk} from "../config";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {getAuthHeaders} from "../data";
import {DeliveryDTO, DeliveryStatus} from "../../types/delivery";


// Helper function for claiming delivery (called by useProceedDelivery or directly)
const claimDelivery = async (
  deliveryId: string,
  driverId: string,
): Promise<DeliveryDTO> => {
  const {delivery} = await sellerSdk.client.fetch<{ delivery: DeliveryDTO }>(
    `/store/deliveries/${deliveryId}/claim`,
    {
      method: "POST",
      body: JSON.stringify({driver_id: driverId}),
      headers: {
        "Content-Type": "application/json",
        ...await getAuthHeaders(),
      },
    }
  );
  return delivery;
};


// Helper function for picking up delivery (called by useProceedDelivery or directly)
const pickUpDelivery = async (
  deliveryId: string,
): Promise<DeliveryDTO> => {
  const {delivery} = await sellerSdk.client.fetch<{ delivery: DeliveryDTO }>(
    `/store/deliveries/${deliveryId}/pick-up`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...await getAuthHeaders(),
      },
    }
  );
  return delivery;
};

// Helper function for completing delivery (called by useProceedDelivery or directly)
const completeDelivery = async (
  deliveryId: string,
): Promise<DeliveryDTO> => {
  const {delivery} = await sellerSdk.client.fetch<{ delivery: DeliveryDTO }>(
    `/store/deliveries/${deliveryId}/complete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...await getAuthHeaders(),
      },
    }
  );
  return delivery;
};

// Helper function for accepting delivery (called by useProceedDelivery or directly)
const acceptDelivery = async (
  deliveryId: string,
): Promise<DeliveryDTO> => {
  const {delivery} = await sellerSdk.client.fetch<{ delivery: DeliveryDTO }>(
    `/store/deliveries/${deliveryId}/accept`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...await getAuthHeaders(),
      },
    }
  );
  return delivery;
};


// Helper function for preparing delivery (called by useProceedDelivery or directly)
const prepareDelivery = async (
  deliveryId: string,
): Promise<DeliveryDTO> => {
  const {delivery} = await sellerSdk.client.fetch<{ delivery: DeliveryDTO }>(
    `/store/deliveries/${deliveryId}/prepare`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...await getAuthHeaders(),
      },
    }
  );
  return delivery;
};

// Helper function for preparation ready (called by useProceedDelivery or directly)
const preparationReady = async (
  deliveryId: string,
): Promise<DeliveryDTO> => {
  const {delivery} = await sellerSdk.client.fetch<{ delivery: DeliveryDTO }>(
    `/store/deliveries/${deliveryId}/ready`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...await getAuthHeaders(),
      },
    }
  );
  return delivery;
};

export const useDeliveryActions = () => {
  const queryClient = useQueryClient();

  const proceedDeliveryMutation = useMutation({
    mutationFn: async ({
                         delivery,
                         driverId, // Pass driverId if needed for claiming
                       }: {
      delivery: DeliveryDTO;
      driverId?: string;
    }) => {

      if (delivery.delivery_status === DeliveryStatus.PENDING) {
        return await acceptDelivery(delivery.id);
      }

      if (
        delivery.delivery_status === DeliveryStatus.RESTAURANT_ACCEPTED &&
        driverId
      ) {
        return await claimDelivery(delivery.id, driverId);
      }

      if (delivery.delivery_status === DeliveryStatus.PICKUP_CLAIMED) {
        return await prepareDelivery(delivery.id);
      }

      if (delivery.delivery_status === DeliveryStatus.RESTAURANT_PREPARING) {
        return await preparationReady(delivery.id);
      }
      if (delivery.delivery_status === DeliveryStatus.READY_FOR_PICKUP) {
        return await pickUpDelivery(delivery.id);
      }

      if (delivery.delivery_status === DeliveryStatus.IN_TRANSIT) {
        return await completeDelivery(delivery.id);
      }

      throw new Error("Delivery is not in a state that can be proceeded");
    },
    onSuccess: (updatedDelivery) => {
      queryClient.invalidateQueries({queryKey: ["deliveries"]});
      // Optionally update the specific delivery in cache
      queryClient.setQueryData(
        ["delivery", updatedDelivery.id],
        updatedDelivery
      );
    },
    onError: (error) => {
      console.error("Error proceeding delivery:", error);
    },
  });
  const passDeliveryMutation = useMutation({
    mutationFn: async ({
                         deliveryId,
                         driverId,
                       }: {
      deliveryId: string;
      driverId: string;
    }) => {
      await sellerSdk.client.fetch(`/store/deliveries/${deliveryId}/pass`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...await getAuthHeaders(),
        },
        body: JSON.stringify({
          driver_id: driverId,
        }),
      });
      return {message: "Delivery passed"};
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["deliveries"]});
      // Optionally remove the delivery from the driver's list in cache
    },
    onError: (error) => {
      console.error("Error passing delivery:", error);
      throw new Error("Error passing delivery");
    },
  });
  const declineDeliveryMutation = useMutation({
    mutationFn: async (deliveryId: string) => {
      const {delivery} = await sellerSdk.client.fetch<{ delivery: DeliveryDTO }>(
        `/store/deliveries/${deliveryId}/decline`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...await getAuthHeaders(),
          },
        }
      );
      return delivery;
    },
    onSuccess: (updatedDelivery) => {
      queryClient.invalidateQueries({queryKey: ["deliveries"]});
      queryClient.setQueryData(
        ["delivery", updatedDelivery.id],
        updatedDelivery
      );
    },
    onError: (error) => {
      console.error("Error declining delivery:", error);
    },
  });
  return {
    proceedDelivery: proceedDeliveryMutation.mutate,
    passDelivery: passDeliveryMutation.mutate,
    declineDelivery: declineDeliveryMutation.mutate,
  };
}
