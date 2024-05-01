import { createFileRoute } from "@tanstack/react-router";
import { productsQueryOptions } from "../products";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductCard from "../components/productCard";
import { useState } from "react";
import { Filters } from "../components/filters";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(productsQueryOptions),
  component: HomePage,
});

function HomePage() {
  const productsQuery = useSuspenseQuery(productsQueryOptions);
  const [titleFilter, setTitleFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const products = productsQuery.data;
  const availableCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    let titleMatch = true;
    let categoryMatch = true;
    let priceMatch = true;

    if (titleFilter) {
      titleMatch = product.title
        .toLocaleLowerCase()
        .includes(titleFilter.toLowerCase());
    }
    if (categoryFilter) {
      categoryMatch = product.category === categoryFilter;
    }

    if (priceFilter) {
      priceMatch = product.price <= parseFloat(priceFilter);
    }

    return titleMatch && categoryMatch && priceMatch;
  });

  return (
    <div>
      <Filters
        availableCategories={availableCategories}
        priceFilter={priceFilter}
        setCategoryFilter={setCategoryFilter}
        setPriceFilter={setPriceFilter}
        setTitleFilter={setTitleFilter}
        titleFilter={titleFilter}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-16 py-12">
        {filteredProducts?.map((product) => {
          return <ProductCard key={product.id} product={product}></ProductCard>;
        })}
      </div>
    </div>
  );
}
