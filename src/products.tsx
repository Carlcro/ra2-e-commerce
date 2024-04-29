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

export class PostNotFoundError extends Error {}

const PRODUCTS_BASEURL = "https://fakestoreapi.com/products";

export const fetchProduct = async (postId: string) => {
  await new Promise((r) => setTimeout(r, 500));
  const post = await axios
    .get<Product>(`${PRODUCTS_BASEURL}/${postId}`)
    .then((r) => r.data)
    .catch((err) => {
      if (err.response.status === 404) {
        throw new PostNotFoundError(`Post with id "${postId}" not found!`);
      }
      throw err;
    });

  return post;
};

export const fetchProducts = async () => {
  return axios
    .get<Product[]>(`${PRODUCTS_BASEURL}`)
    .then((r) => r.data.slice(0, 10));
};

export const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: () => fetchProducts(),
});

export const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["posts", { postId }],
    queryFn: () => fetchProduct(postId),
  });
