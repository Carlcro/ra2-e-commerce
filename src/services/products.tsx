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

export const fetchProduct = async (postId: string) => {
  const post = await axios
    .get<Product>(`${PRODUCTS_BASEURL}/${postId}`)
    .then((r) => r.data)
    .catch((err) => {
      if (err.response.status === 404) {
        throw new Error(`Post with id "${postId}" not found!`);
      }
      throw new Error("Something went wrong");
    });

  if (!post) {
    throw new Error(`Post with id "${postId}" not found!`);
  }

  return post;
};

export const fetchProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return axios.get<Product[]>(`${PRODUCTS_BASEURL}`).then((r) => r.data);
};

export const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: () => fetchProducts(),
});

export const productQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["product", { postId }],
    queryFn: () => fetchProduct(postId),
  });
