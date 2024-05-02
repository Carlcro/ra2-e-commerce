import { useCart } from "../CartContext";

export const OrderSummery = () => {
  const { totalCost, cartItems } = useCart();

  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-4">
        {cartItems
          .filter((item) => item.quantity > 0)
          .map((item) => (
            <div key={item.product.id} className="flex justify-between">
              <span>{`${item.product.title} x ${item.quantity}`}</span>
              <span>{`${item.product.price * item.quantity} .-`}</span>
            </div>
          ))}
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{`${totalCost.toFixed(2)} -.`}</span>
        </div>
      </div>
    </div>
  );
};
