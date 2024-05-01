import { Link, createFileRoute } from "@tanstack/react-router";
import { useCart } from "../CartContext";
import { ShoppingCartCard } from "../components/shoppingCartCard";

export const Route = createFileRoute("/shoppingCart")({
  component: ShoppingCart,
});

function ShoppingCart() {
  const { cartItems } = useCart();

  return (
    <div className="flex flex-col items-center  max-w-[800px] mx-auto">
      <h2 className="text-2xl">Shopping Cart</h2>
      <div className="flex flex-col gap-4 mt-5 w-full">
        {cartItems.length === 0 ? (
          <span className="text-center">Shopping cart is empty</span>
        ) : (
          <>
            {cartItems.map((item) => (
              <ShoppingCartCard key={item.product.id} item={item} />
            ))}
            <Link
              className="w-full bg-black text-white py-2 flex items-center justify-center mt-5"
              to="/checkout"
            >
              Go to Checkout
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
