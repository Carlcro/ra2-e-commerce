import React, { createContext, useContext, useReducer } from "react";
import { Product } from "./products";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  dispatch: React.Dispatch<CartAction>;
}

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";

const CartContext = createContext<CartContextType | null>(null);

type CartAction =
  | { type: typeof ADD_ITEM; payload: Product }
  | { type: typeof REMOVE_ITEM; payload: number }
  | { type: typeof UPDATE_QUANTITY; payload: { id: number; quantity: number } };

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

    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode;
}

// Provider Component
export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

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

  const addItem = (product: Product) =>
    dispatch({ type: ADD_ITEM, payload: product });
  const removeItem = (id: number) =>
    dispatch({ type: REMOVE_ITEM, payload: id });
  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity } });

  return { cartItems, addItem, removeItem, updateQuantity, numberOfItems };
}
