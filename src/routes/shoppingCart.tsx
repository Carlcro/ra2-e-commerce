import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "../CartContext";
import { ShoppingCartCard } from "../components/shoppingCartCard";

export const Route = createFileRoute("/shoppingCart")({
  component: ShoppingCart,
});

function ShoppingCart() {
  const { cartItems } = useCart();

  return (
    <div className="flex flex-col  items-center">
      <h2 className="text-2xl">Shopping Cart</h2>
      <div className="flex flex-col gap-4 mt-5  max-w-[800px]">
        {cartItems.map((item) => (
          <ShoppingCartCard item={item} />
        ))}
      </div>
    </div>
  );
}
