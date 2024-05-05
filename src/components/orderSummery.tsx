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
            <div
              key={item.product.id}
              className="flex justify-between items-center text-md md:text-lg "
            >
              <div className="flex flex-col">
                <span>{item.product.title}</span>
                <span>x {item.quantity}</span>
              </div>
              <span className="whitespace-nowrap">{`${(item.product.price * item.quantity).toFixed(2)} .-`}</span>
            </div>
          ))}
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{`${totalCost.toFixed(2)} .-`}</span>
        </div>
      </div>
    </div>
  );
};
