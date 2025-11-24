import {UpsertAddressDTO} from "@medusajs/types";
import {sellerSdk} from "../config";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useCart} from "./carts";
import {DeliveryDTO} from "../../types/delivery";

// This file is primarily for checkout actions that might involve server-side steps
// or complex flows. For a purely client-side approach with React Query,
// some of these actions might need to be re-evaluated or handled differently
// depending on the Medusa backend implementation and desired user experience.
// However, we can refactor the existing functions to be callable from the client
// and use mutations where appropriate.

// Note: The original `placeOrder` function involved server-side redirects and
// cookie manipulation. This client-side version will need a different approach
// for handling the post-order flow, likely involving client-side navigation
// and state management.

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const {cartId} = useCart();

  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      if (!cartId) {
        throw new Error("No cart found");
      }

      const {cart} = await sellerSdk.store.cart.update(cartId, data);
      return cart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(["cart", updatedCart.id], updatedCart);
      queryClient.invalidateQueries({queryKey: ["cart"]});
    },
    onError: (error) => {
      console.error("Error updating cart:", error);
    },
  });
};

export const useCompleteCart = () => {
  const queryClient = useQueryClient();
  const {cartId, clearCart} = useCart();

  return useMutation({
    mutationFn: async () => {
      if (!cartId) {
        throw new Error("No cart found");
      }

      const response = await sellerSdk.store.cart.complete(cartId);
      return response;
    },
    onSuccess: async (response) => {
      // Assuming successful completion means the cart is no longer needed
      await clearCart();
      queryClient.invalidateQueries({queryKey: ["cart"]});
      // Handle post-completion logic, e.g., navigate to order confirmation
    },
    onError: (error) => {
      console.error("Error completing cart:", error);
    },
  });
};

export const useAddPaymentSession = () => {
  const queryClient = useQueryClient();
  const {cart} = useCart();

  return useMutation({
    mutationFn: async () => {
      if (!cart) {
        throw new Error("No cart found");
      }

      const res = await sellerSdk.store.payment.initiatePaymentSession(cart);
      return res;
    },
    onSuccess: (res) => {
      // Update cart data in cache if necessary
      queryClient.invalidateQueries({queryKey: ["cart"]});
    },
    onError: (error) => {
      console.error("Error adding payment session:", error);
    },
  });
};

export const useCreateDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
                         cartId,
                         restaurantId,
                       }: {
      cartId: string;
      restaurantId: string;
    }) => {
      const {delivery} = await sellerSdk.client.fetch<{
        delivery: DeliveryDTO;
      }>("/store/deliveries", {
        method: "POST",
        body: JSON.stringify({cart_id: cartId, restaurant_id: restaurantId}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return delivery;
    },
    onSuccess: (delivery) => {
      queryClient.invalidateQueries({queryKey: ["deliveries"]});
      // Store delivery ID client-side if needed for subsequent actions
      // medusaStorage.set("_delivery_id", delivery.id);
    },
    onError: (error) => {
      console.error("Error creating delivery:", error);
    },
  });
};

// Refactored placeOrder for client-side usage
export const usePlaceOrder = () => {
  const queryClient = useQueryClient();
  const {cartId, clearCart} = useCart();
  const updateCartMutation = useUpdateCart();
  const createDeliveryMutation = useCreateDelivery();
  const completeCartMutation = useCompleteCart();

  return useMutation({
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      zip: string;
      phone: string;
      email: string;
      restaurantId: string;
    }) => {
      if (!cartId) {
        throw new Error("No cart found");
      }

      const {
        firstName,
        lastName,
        address,
        city,
        zip,
        phone,
        email,
        restaurantId,
      } = data;

      const shippingAddress: UpsertAddressDTO = {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        city,
        postal_code: zip,
        phone,
      };

      try {
        // Update cart with shipping address
        await updateCartMutation.mutateAsync({
          shipping_address: shippingAddress,
        });

        // Create delivery
        const delivery = await createDeliveryMutation.mutateAsync({
          cartId,
          restaurantId,
        });

        // Complete the cart (place the order)
        await completeCartMutation.mutateAsync();

        // Clear the local cart state
        await clearCart();

        // Return delivery ID or other relevant info for navigation/confirmation
        return delivery.id;
      } catch (error) {
        console.error("Error placing order:", error);
        throw new Error("Error placing order");
      }
    },
    onSuccess: (deliveryId) => {
      // Handle successful order placement, e.g., navigate to order details page
      // This part would typically be handled in the component calling the mutation
      console.log("Order placed successfully, delivery ID:", deliveryId);
      // Example: history.push(`/your-order/${deliveryId}`);
    },
    onError: (error) => {
      console.error("Place order mutation error:", error);
      // Handle error in the component calling the mutation
    },
  });
};
