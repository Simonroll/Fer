"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Review, ProductReviewsData } from "@/lib/reviews";

type Action =
  | { type: "SET"; payload: Review[] }
  | { type: "ADD"; payload: Review }
  | { type: "UPDATE"; payload: Review }
  | { type: "REMOVE"; payload: number };

function reviewsReducer(state: Review[], action: Action): Review[] {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [action.payload, ...state.filter((r) => r.id !== action.payload.id)];
    case "UPDATE":
      return state.map((r) => (r.id === action.payload.id ? action.payload : r));
    case "REMOVE":
      return state.filter((r) => r.id !== action.payload);
    default:
      return state;
  }
}

interface ReviewsContextType {
  reviews: Review[];
  myReview: Review | null;
  average: number;
  count: number;
  submitReview: (rating: number, comment: string) => Promise<{ success: boolean; error?: string }>;
  updateReview: (rating: number, comment: string) => Promise<{ success: boolean; error?: string }>;
  deleteReview: () => Promise<{ success: boolean; error?: string }>;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export function ReviewsProvider({
  productId,
  initialReviews,
  children,
}: {
  productId: number;
  initialReviews: ProductReviewsData | Review[];
  children: React.ReactNode;
}) {
  const initialList = useMemo(() => {
    if (Array.isArray(initialReviews)) {
      return initialReviews;
    }
    return initialReviews?.reviews || [];
  }, [initialReviews]);

  const [reviews, dispatch] = useReducer(reviewsReducer, initialList);
  const { user } = useAuth();
  const router = useRouter();

  const myReview = useMemo(() => {
    if (!user) return null;
    return reviews.find((r) => r.user_id === user.id) || null;
  }, [reviews, user]);

  const count = reviews.length;
  const average = useMemo(() => {
    if (count === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Number((sum / count).toFixed(1));
  }, [reviews, count]);

  const submitReview = useCallback(
    async (rating: number, comment: string) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) {
        return { success: false, error: "Unauthorized" };
      }

      try {
        const res = await fetch("/api/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: productId,
            rating,
            comment,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          return { success: false, error: data.error || "Failed to submit review" };
        }

        dispatch({ type: "ADD", payload: data as Review });
        router.refresh();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Network error";
        return { success: false, error: msg };
      }
    },
    [productId, router]
  );

  const updateReview = useCallback(
    async (rating: number, comment: string) => {
      if (!myReview) {
        return { success: false, error: "No review found to update" };
      }

      const { data, error } = await supabase
        .from("reviews")
        .update({
          rating,
          comment: comment.trim(),
        })
        .eq("id", myReview.id)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      dispatch({ type: "UPDATE", payload: data as Review });
      router.refresh();
      return { success: true };
    },
    [myReview, router]
  );

  const deleteReview = useCallback(async () => {
    if (!myReview) {
      return { success: false, error: "No review found to delete" };
    }

    const reviewToDelete = myReview;
    // Optimistic delete
    dispatch({ type: "REMOVE", payload: reviewToDelete.id });

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewToDelete.id);

    if (error) {
      // Rollback on error
      dispatch({ type: "ADD", payload: reviewToDelete });
      return { success: false, error: error.message };
    }

    router.refresh();
    return { success: true };
  }, [myReview, router]);

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        myReview,
        average,
        count,
        submitReview,
        updateReview,
        deleteReview,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
}
