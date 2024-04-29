import { Link } from "@tanstack/react-router";
import { Product } from "../products";
import { useCart } from "../CartContext";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { image, category, description, rating, title, price } = product;
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <Link className="block relative" href="#">
        <img
          alt="Product Image"
          className="w-full h-64 object-scale-down group-hover:opacity-80 transition-opacity"
          height={400}
          src={`${image}`}
          width={600}
        />
      </Link>
      <div className="p-4 h-full justify-evenly">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {category}
            </span>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <span className="text-sm font-medium">{rating.rate}</span>
              <span className="text-sm font-medium">({rating.count})</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">
            <Link className="hover:text-primary transition-colors" href="#">
              {title}
            </Link>
          </h3>
          <p className="text-gray-500 mb-4 line-clamp-4">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-primary font-semibold">{`${price} chf`}</span>
          <button
            onClick={() => addItem(product)}
            className="bg-black text-white px-3 py-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
