import { createFileRoute } from "@tanstack/react-router";
import { productsQueryOptions } from "../services/products";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductCard from "../components/productCard";
import { Filters } from "../components/filters";

type ProductSearch = {
  search: string;
  price?: number | string;
  category: string;
};

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(productsQueryOptions),
  component: HomePage,
  errorComponent: ErrorComponent,
  pendingComponent: LoadingComponent,
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      search: search.search as string,
      price: search.price as number,
      category: search.category as string,
    };
  },
});

function LoadingComponent() {
  return (
    <div className="grid place-content-center h-64">
      <p>Loading..</p>
    </div>
  );
}

function ErrorComponent() {
  return (
    <div className="grid place-content-center">
      <p>Could not load products. Please try again later.</p>
    </div>
  );
}

function HomePage() {
  const productsQuery = useSuspenseQuery(productsQueryOptions);

  const { search, price, category } = Route.useSearch();

  const products = productsQuery.data;
  const availableCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    let titleMatch = true;
    let categoryMatch = true;
    let priceMatch = true;

    if (search && typeof search === "string") {
      titleMatch = product.title
        .toLocaleLowerCase()
        .includes(search.toLowerCase());
    }
    if (category && typeof category === "string") {
      categoryMatch = product.category === category;
    }

    if (typeof price === "number") {
      priceMatch = product.price <= price;
    }

    return titleMatch && categoryMatch && priceMatch;
  });

  return (
    <div>
      <Filters availableCategories={availableCategories} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-16 py-12">
        {filteredProducts.length === 0 && <span>No products found</span>}
        {filteredProducts?.map((product) => {
          return <ProductCard key={product.id} product={product}></ProductCard>;
        })}
      </div>
    </div>
  );
}
