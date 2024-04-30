import { createFileRoute } from "@tanstack/react-router";
import { CheckoutForm } from "../components/checkoutForm";
import { OrderSummery } from "../components/orderSummery";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-6">
      <CheckoutForm />
      <OrderSummery />
    </div>
  );
}
