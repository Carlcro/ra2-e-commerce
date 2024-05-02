import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "./services/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  dispatch: React.Dispatch<CartAction>;
};

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const CLEAR_CART = "CLEAR_CART";

const CartContext = createContext<CartContextType | null>(null);

type CartAction =
  | { type: typeof ADD_ITEM; payload: Product }
  | { type: typeof REMOVE_ITEM; payload: number }
  | { type: typeof UPDATE_QUANTITY; payload: { id: number; quantity: number } }
  | { type: typeof CLEAR_CART };

function addOrUpdateCartItem(
  cartItems: CartItem[],
  product: Product
): CartItem[] {
  const index = cartItems.findIndex((item) => item.product.id === product.id);
  if (index !== -1) {
    const newItem = {
      ...cartItems[index],
      quantity: cartItems[index].quantity + 1,
    };
    return [
      ...cartItems.slice(0, index),
      newItem,
      ...cartItems.slice(index + 1),
    ];
  } else {
    return [...cartItems, { product, quantity: 1 }];
  }
}

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case ADD_ITEM:
      return addOrUpdateCartItem(state, action.payload);
    case REMOVE_ITEM:
      return state.filter((item) => item.product.id !== action.payload);
    case UPDATE_QUANTITY:
      return state.map((item) =>
        item.product.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case CLEAR_CART:
      return [];

    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const [cartItems, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  const { cartItems, dispatch } = context;

  const numberOfItems = cartItems.reduce(
    (prev, curr) => prev + curr.quantity,
    0
  );

  const totalCost = cartItems.reduce(
    (prev, curr) => prev + curr.product.price * curr.quantity,
    0
  );

  const addItem = (product: Product) =>
    dispatch({ type: ADD_ITEM, payload: product });
  const removeItem = (id: number) =>
    dispatch({ type: REMOVE_ITEM, payload: id });
  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity } });
  const clearCart = () => dispatch({ type: CLEAR_CART });

  return {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    numberOfItems,
    totalCost,
    clearCart,
  };
}
