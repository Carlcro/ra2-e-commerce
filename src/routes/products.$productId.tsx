import { createFileRoute } from "@tanstack/react-router";
import { productQueryOptions } from "../products";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductCard from "../components/productCard";

export const Route = createFileRoute("/products/$productId")({
  component: Product,
  loader: ({ context: { queryClient }, params: { productId } }) => {
    return queryClient.ensureQueryData(productQueryOptions(productId));
  },
});

function Product() {
  const productId = Route.useParams().productId;
  const { data: product } = useSuspenseQuery(productQueryOptions(productId));

  return (
    <div className="w-[500px] mx-auto mt-12">
      <ProductCard product={product} />
    </div>
  );
}
