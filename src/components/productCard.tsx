import { Link } from "@tanstack/react-router";
import { Product } from "../products";
import { useCart } from "../CartContext";

type Props = {
  product: Product;
  showFullDescription?: boolean;
};

export default function ProductCard({
  product,
  showFullDescription = false,
}: Props) {
  const { image, category, description, rating, title, price, id } = product;
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md group">
      <Link className="block relative" to={`/products/${id}`}>
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
            <span className="text-sm font-medium text-gray-500 ">
              {category}
            </span>
            <div className="flex items-center gap-2 text-gray-500 ">
              <span className="text-sm font-medium">{rating.rate}</span>
              <span className="text-sm font-medium">({rating.count})</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">
            <Link to={`/products/${id}`}>{title}</Link>
          </h3>
          <p
            className={`text-gray-500 mb-4 ${showFullDescription ? "" : "line-clamp-4"}`}
          >
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">{`${price} .-`}</span>
          <button
            onClick={() => addItem(product)}
            className="bg-black text-white px-3 py-2 rounded-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
