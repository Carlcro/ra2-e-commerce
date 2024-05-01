import { Link } from "@tanstack/react-router";
import { Product } from "../services/products";
import { useCart } from "../CartContext";
import { useEffect, useState } from "react";

type Props = {
  product: Product;
  showFullDescription?: boolean;
};

export default function ProductCard({
  product,
  showFullDescription = false,
}: Props) {
  const [itemAdded, setItemAdded] = useState(false);
  const { image, category, description, rating, title, price, id } = product;
  const { addItem } = useCart();

  const handleAddItem = (product: Product) => {
    addItem(product);
    setItemAdded(true);
  };

  useEffect(() => {
    if (itemAdded) {
      const timer = setTimeout(() => {
        setItemAdded(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [itemAdded]);

  return (
    <div className="flex flex-col justify-between bg-white rounded-lg shadow-md group p-4">
      <div>
        <Link className="block relative" to={`/products/${id}`}>
          <img
            alt={`${title}`}
            className="w-full h-64 object-scale-down group-hover:opacity-80 transition-opacity"
            height={400}
            src={`${image}`}
            width={600}
          />
        </Link>
        <div className="justify-between mt-2">
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
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold">{`${price} .-`}</span>
        <button
          onClick={() => handleAddItem(product)}
          className="bg-black text-white px-3 py-2 rounded-md hover:bg-gray-700 active:bg-black w-28"
        >
          {itemAdded ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
