import { supabase } from "@/lib/supabaseClient";

export interface Review {
  id: number;
  user_id: string;
  product_id: number;
  rating: number;
  comment: string;
  author: string;
  created_at: string;
}

export interface ProductReviewsData {
  average: number;
  count: number;
  reviews: Review[];
}

export async function getReviewsForProduct(productId: number): Promise<ProductReviewsData> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return {
      average: 0,
      count: 0,
      reviews: [],
    };
  }

  const reviews = data as Review[];
  const count = reviews.length;
  
  if (count === 0) {
    return {
      average: 0,
      count: 0,
      reviews: [],
    };
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const average = Number((sum / count).toFixed(1));

  return {
    average,
    count,
    reviews,
  };
}
