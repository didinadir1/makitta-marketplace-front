import {HttpTypes} from "@medusajs/types";
import {medusaStorage, sellerSdk} from "../config";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {User} from "../../types/user";
import {getAuthHeaders} from "../data";
// Storage helpers
const CART_ID_KEY = '_cart_id';

export const getCartId = async () => {
  const {value} = await (await medusaStorage).get(CART_ID_KEY);
  return value;
};

export const setCartId = async (cartId: string) => {
  await (await medusaStorage).set(CART_ID_KEY, cartId);
};

export const removeCartId = async () => {
  await (await medusaStorage).remove(CART_ID_KEY);
};

// Cart functions
export const createCart = async (data: HttpTypes.StoreCreateCart, restaurant_id: string, user: User) => {
  try {
    const {regions} = await sellerSdk.store.region.list();
    const region = regions[0];

    const body = {
      email: user?.email,
      region_id: region.id,
      metadata: {
        restaurant_id,
      },
      ...data,
    } as HttpTypes.StoreCreateCart & { items: HttpTypes.StoreAddCartLineItem[] };

    const {cart} = await sellerSdk.store.cart.create(
      body,
      {},
      {
        ...await getAuthHeaders(),
      }
    );
    await setCartId(cart.id);

    return cart;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
};

export const addToCart = async (variantId: string, restaurantId: string, user: User) => {
  try {
    let cartId = await getCartId();
    let cart;

    if (!cartId) {
      cart = await createCart(
        {currency_code: "eur"},
        restaurantId,
        user
      );
      cartId = cart?.id;
    }

    if (!cartId) {
      throw new Error("Error creating cart");
    }

    const {cart: updatedCart} = await sellerSdk.store.cart.createLineItem(cartId, {
      variant_id: variantId,
      quantity: 1,
    });

    return updatedCart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const removeItemFromCart = async (lineItemId: string) => {
  try {
    const cartId = await getCartId();

    if (!cartId) {
      throw new Error("No cart found");
    }

    await sellerSdk.store.cart.deleteLineItem(cartId, lineItemId);
    return {success: true};
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

export const transferCart = async () => {
  try {
    const cartId = await getCartId();
    if (!cartId) {
      throw new Error("No cart found to transfer");
    }

    const {cart} = await sellerSdk.store.cart.transferCart(cartId, {}, await getAuthHeaders());
    await setCartId(cart.id);
    return cart;
  } catch (error) {
    console.error('Error transferring cart:', error);
    throw error;
  }
}

// Main cart hook
export const useCart = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as User;
  const [cartId, setCartIdState] = useState<string | null>(null);

  // Initialize cart ID on mount
  useEffect(() => {
    const initCartId = async () => {
      const id = await getCartId();
      setCartIdState(id);
    };
    initCartId();
  }, []);

  // Get cart query
  const {
    data: cart,
    isLoading: isCartLoading,
    error: cartError,
  } = useQuery({
    queryKey: ['cart', cartId],
    queryFn: async () => {
      if (!cartId) return null;
      const {cart} = await sellerSdk.store.cart.retrieve(
        cartId,
        {
          fields:
            "+metadata, +items.*, +items.thumbnail, +items.title, +items.quantity, +items.total, +items.variant",
        },
        {
          ...await getAuthHeaders(),
        }
      );
      return cart;
    },
    enabled: !!cartId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Create cart mutation
  const createCartMutation = useMutation({
    mutationFn: ({data, restaurantId}: {
      data: HttpTypes.StoreCreateCart;
      restaurantId: string;
    }) => createCart(data, restaurantId, user),
    onSuccess: (newCart) => {
      setCartIdState(newCart.id);
      queryClient.setQueryData(['cart', newCart.id], newCart);
    },
    onError: (error) => {
      console.error('Create cart error:', error);
    },
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: ({variantId, restaurantId}: {
      variantId: string,
      restaurantId: string;
    }) => addToCart(variantId, restaurantId, user),
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(['cart', updatedCart.id], updatedCart);
      queryClient.invalidateQueries({queryKey: ['cart']});
    },
    onError: (error) => {
      console.error('Add to cart error:', error);
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: (lineItemId: string) => removeItemFromCart(lineItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cart']});
    },
    onError: (error) => {
      console.error('Remove from cart error:', error);
    },
  });

  // Update cart item quantity
  const updateCartItemMutation = useMutation({
    mutationFn: async ({lineItemId, quantity}: {
      lineItemId: string;
      quantity: number;
    }) => {
      if (!cartId) throw new Error("No cart found");

      const {cart} = await sellerSdk.store.cart.updateLineItem(cartId, lineItemId, {
        quantity,
      });
      return cart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(['cart', updatedCart.id], updatedCart);
    },
    onError: (error) => {
      console.error('Update cart item error:', error);
    },
  });
  const transferCartMutation = useMutation({
    mutationFn: () => transferCart(),
    onSuccess: (newCart) => {
      setCartIdState(newCart.id);
      queryClient.setQueryData(['cart', newCart.id], newCart);
    },
    onError: (error) => {
      console.error('Transfer cart error:', error);
    },
  });

  // Clear cart
  const clearCart = async () => {
    await removeCartId();
    setCartIdState(null);
    queryClient.removeQueries({queryKey: ['cart']});
  };

  return {
    // Cart data
    cart,
    cartId,
    isCartLoading,
    cartError,

    // Cart stats
    totalItems: cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
    subtotal: cart?.subtotal || 0,
    total: cart?.total || 0,

    // Mutations
    createCart: createCartMutation.mutate,
    addToCart: addToCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    updateCartItem: updateCartItemMutation.mutate,
    transferCart: transferCartMutation.mutate,
    clearCart,

    // Loading states
    isCreatingCart: createCartMutation.isPending,
    isAddingToCart: addToCartMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
    isUpdatingCartItem: updateCartItemMutation.isPending,
    isTransferringCart: transferCartMutation.isPending,

    // Errors
    createCartError: createCartMutation.error,
    addToCartError: addToCartMutation.error,
    removeFromCartError: removeFromCartMutation.error,
    updateCartItemError: updateCartItemMutation.error,
    transferCartError: transferCartMutation.error,
  };
};
