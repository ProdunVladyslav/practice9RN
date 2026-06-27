import { ProductsResponse } from '../types/product';
import client from './dummy_json_client';

export const getProducts = async (): Promise<ProductsResponse> => {
  const { data } = await client.get<ProductsResponse>('/products');
  return data;
};
