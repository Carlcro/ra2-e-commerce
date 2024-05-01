import { createFileRoute } from "@tanstack/react-router";
import { productQueryOptions } from "../services/products";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductCard from "../components/productCard";

export const Route = createFileRoute("/products/$productId")({
  component: Product,
  loader: ({ context: { queryClient }, params: { productId } }) => {
    return queryClient.ensureQueryData(productQueryOptions(productId));
  },
  errorComponent: ({ error }) => <ErrorComponent error={error as Error} />,
});

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="grid place-content-center">
      <p>{error.message}</p>
    </div>
  );
}

function Product() {
  const productId = Route.useParams().productId;
  const { data: product } = useSuspenseQuery(productQueryOptions(productId));

  return (
    <div className="max-w-[500px] mx-auto mt-12">
      <ProductCard showFullDescription product={product} />
    </div>
  );
}
