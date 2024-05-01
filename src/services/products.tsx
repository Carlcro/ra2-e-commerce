import axios from "axios";
import { queryOptions } from "@tanstack/react-query";

export type Product = {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
};

const PRODUCTS_BASEURL = "https://fakestoreapi.com/products";

export const fetchProduct = async (productId: string) => {
  const product = await axios
    .get<Product>(`${PRODUCTS_BASEURL}/${productId}`)
    .then((r) => r.data)
    .catch((err) => {
      if (err.response.status === 404) {
        throw new Error(`Product not found`);
      }
      throw new Error("Something went wrong");
    });

  // fakestoreapi does not return an error of product doesn't exists
  if (!product) {
    throw new Error(`Product not found!`);
  }

  return product;
};

export const fetchProducts = async () => {
  return axios.get<Product[]>(`${PRODUCTS_BASEURL}`).then((r) => r.data);
};

export const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: () => fetchProducts(),
});

export const productQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: ["product", { productId }],
    queryFn: () => fetchProduct(productId),
  });
