import { CartItem, useCart } from "../CartContext";

type Props = {
  item: CartItem;
};

export const ShoppingCartCard = ({ item }: Props) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  return (
    <div className="bg-white rounded-lg shadow-sm border border-b-2 flex justify-between p-6">
      <div className="flex gap-7">
        <div>
          <img
            alt="Product Image"
            className="w-32 h-32 object-scale-down group-hover:opacity-80 transition-opacity"
            height={400}
            src={`${product.image}`}
            width={600}
          />
        </div>
        <div className="flex flex-col justify-between py-1">
          <div className="flex flex-col">
            <span className="text-2xl">{product.title}</span>
            <span className="text-xl">{`${product.price} .-`}</span>
          </div>
          <input
            className="border-2 border-black w-12 flex text-center"
            type="number"
            value={quantity}
            onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
          />
        </div>
      </div>
      <div>
        <button onClick={() => removeItem(product.id)}>Remove</button>
      </div>
    </div>
  );
};
