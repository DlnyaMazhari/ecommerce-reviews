export interface Review {
  product_id: string | number;
  content: string;
  rating: number;
  user_id?: string | number;
}
