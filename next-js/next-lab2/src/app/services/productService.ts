import { Product, ProductsResponse } from "@/types/product";
import { API } from "../api/api";

export const getAllProducts = async () => {
  const res = await fetch(`${API}products`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 300,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  const data: ProductsResponse = await res.json();
  return data.products;
};

export const getAllProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${API}products/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 300,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product with ID ${id}: ${res.statusText}`);
  }

  const data: Product = await res.json();
  return data;
};
