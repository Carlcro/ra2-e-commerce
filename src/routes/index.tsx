import { Link, createFileRoute } from "@tanstack/react-router";
import { postsQueryOptions } from "../products";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductCard from "../components/productCard";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postsQueryOptions),
  component: HomePage,
});

function HomePage() {
  const postsQuery = useSuspenseQuery(postsQueryOptions);
  const posts = postsQuery.data;

  console.log(posts);
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6 py-12">
      {posts?.map((product) => {
        return <ProductCard key={product.id} product={product}></ProductCard>;
      })}
    </section>
  );
}
