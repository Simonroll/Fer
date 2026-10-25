"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { useReviews } from "@/contexts/ReviewsContext";
import { reviewSchema, ReviewInput } from "@/lib/reviewSchema";
import { Button } from "@/components/ui/button";

export function ReviewSection({ productId }: { productId: number }) {
  const { user } = useAuth();
  const {
    reviews,
    myReview,
    average,
    count,
    submitReview,
    updateReview,
    deleteReview,
  } = useReviews();

  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form with Zod schema resolver
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      product_id: productId,
      rating: undefined,
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewInput) => {
    setServerError("");
    setServerSuccess("");
    setIsSubmitting(true);

    if (isEditing && myReview) {
      const res = await updateReview(data.rating, data.comment);
      setIsSubmitting(false);
      if (res.success) {
        setServerSuccess("Review updated successfully!");
        setIsEditing(false);
        reset({ product_id: productId, rating: undefined, comment: "" });
      } else {
        setServerError(res.error || "Failed to update review");
      }
    } else {
      const res = await submitReview(data.rating, data.comment);
      setIsSubmitting(false);
      if (res.success) {
        setServerSuccess("Review submitted successfully!");
        reset({ product_id: productId, rating: undefined, comment: "" });
      } else {
        setServerError(res.error || "Failed to submit review");
      }
    }
  };

  const handleStartEdit = () => {
    if (!myReview) return;
    setIsEditing(true);
    setServerError("");
    setServerSuccess("");
    setValue("product_id", productId);
    setValue("rating", myReview.rating);
    setValue("comment", myReview.comment);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    reset({ product_id: productId, rating: undefined, comment: "" });
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete your review?")) {
      const res = await deleteReview();
      if (!res.success) {
        setServerError(res.error || "Failed to delete review");
      } else {
        setServerSuccess("Review deleted successfully.");
        setIsEditing(false);
      }
    }
  };

  return (
    <div className="mt-12 bg-white/95 border-2 border-[#d4af37] shadow-xl rounded-sm p-6 md:p-8 space-y-8">
      {/* Header: Average rating & count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-6 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            Customer Reviews
          </h2>
          <div className="flex items-center space-x-3 mt-1">
            <span className="text-2xl font-extrabold text-[#bfa87e]">
              <span data-testid="rating-average">{average}</span> / 5
            </span>
            <span className="text-sm text-gray-500 font-medium">
              (<span data-testid="review-count">{count}</span> {count === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>

        {/* Stars display */}
        <div className="flex items-center text-amber-500 text-lg">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={star <= Math.round(average) ? "text-amber-500" : "text-gray-300"}>
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Review Form Area */}
      <div className="bg-amber-50/50 border border-[#d4af37]/40 p-6 rounded-sm">
        {!user ? (
          <div className="text-center py-4">
            <p className="text-sm text-gray-700 mb-2">
              Want to share your thoughts on this merchandise?
            </p>
            <Link
              href="/login"
              data-testid="link-login-to-review"
              className="inline-block text-xs uppercase font-bold tracking-wider text-[#bfa87e] hover:underline"
            >
              Log in to write a review →
            </Link>
          </div>
        ) : !myReview || isEditing ? (
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4">
              {isEditing ? "Edit Your Review" : "Write a Review"}
            </h3>

            {serverError && (
              <div
                data-testid="error-review"
                className="mb-4 p-3 bg-red-100 text-red-700 rounded-sm text-sm font-medium"
              >
                {serverError}
              </div>
            )}

            {serverSuccess && (
              <div
                data-testid="review-success"
                className="mb-4 p-3 bg-green-100 text-green-700 rounded-sm text-sm font-medium"
              >
                {serverSuccess}
              </div>
            )}

            <form
              data-testid="review-form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
            >
              {/* Rating Field */}
              <div className="space-y-1">
                <label className="block text-xs uppercase font-bold text-gray-600 tracking-wider">
                  Rating (1 to 5 Stars)
                </label>
                <select
                  data-testid="input-rating"
                  {...register("rating", { valueAsNumber: true })}
                  className="w-full sm:w-48 px-3 py-2 bg-white border border-[#d4af37] text-gray-900 rounded-none text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                >
                  <option value="">Select a rating</option>
                  <option value="5">5 - Excellent ★★★★★</option>
                  <option value="4">4 - Good ★★★★☆</option>
                  <option value="3">3 - Average ★★★☆☆</option>
                  <option value="2">2 - Poor ★★☆☆☆</option>
                  <option value="1">1 - Terrible ★☆☆☆☆</option>
                </select>
                {errors.rating && (
                  <p data-testid="error-rating" className="text-xs text-red-600 font-medium mt-1">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              {/* Comment Field */}
              <div className="space-y-1">
                <label className="block text-xs uppercase font-bold text-gray-600 tracking-wider">
                  Your Review Comment (1-500 characters)
                </label>
                <textarea
                  data-testid="input-comment"
                  rows={3}
                  placeholder="Share your thoughts about this Reverse: 1999 merchandise..."
                  {...register("comment")}
                  className="w-full px-3 py-2 bg-white border border-[#d4af37] text-gray-900 rounded-none text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                />
                {errors.comment && (
                  <p data-testid="error-comment" className="text-xs text-red-600 font-medium mt-1">
                    {errors.comment.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <Button
                  type="submit"
                  data-testid="btn-submit-review"
                  disabled={isSubmitting}
                  className="bg-[#2a2622] text-[#d4af37] border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] rounded-none uppercase font-bold tracking-wider text-xs px-6 py-2"
                >
                  {isSubmitting ? "Submitting..." : isEditing ? "Update Review" : "Submit Review"}
                </Button>

                {isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="border-[#d4af37] text-gray-700 rounded-none uppercase text-xs"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-3">
            <p className="text-sm font-medium text-gray-700">
              You have already reviewed this product. You can edit or delete your review below.
            </p>
            {serverSuccess && (
              <div
                data-testid="review-success"
                className="mt-3 p-2 bg-green-100 text-green-700 rounded-sm text-sm"
              >
                {serverSuccess}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
          All Reviews
        </h3>

        {count === 0 ? (
          <div
            data-testid="reviews-empty"
            className="p-8 text-center bg-gray-50 border border-dashed border-gray-300 rounded-sm text-gray-500 text-sm"
          >
            No reviews yet. Be the first to share your thoughts!
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => {
              const isOwner = user?.id === review.user_id;
              return (
                <div
                  key={review.id}
                  data-testid="review-item"
                  className={`p-5 rounded-sm border transition-all ${
                    isOwner
                      ? "bg-amber-50/30 border-[#d4af37] shadow-sm"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span
                        data-testid="review-author"
                        className="font-bold text-gray-900 text-sm"
                      >
                        {review.author}
                      </span>
                      {isOwner && (
                        <span className="text-[10px] bg-amber-100 text-[#bfa87e] border border-[#d4af37] px-1.5 py-0.5 uppercase font-bold">
                          You
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      <span
                        data-testid="review-rating"
                        className="text-sm font-extrabold text-[#bfa87e]"
                      >
                        {review.rating}
                      </span>
                      <span className="text-amber-500 text-xs">★</span>
                    </div>
                  </div>

                  <p
                    data-testid="review-comment"
                    className="text-gray-700 text-sm leading-relaxed mb-3 whitespace-pre-line"
                  >
                    {review.comment}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-400">
                    <span>
                      {new Date(review.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>

                    {/* Only owner sees Edit and Delete buttons */}
                    {isOwner && (
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          data-testid="btn-edit-review"
                          onClick={handleStartEdit}
                          className="text-[#bfa87e] hover:underline uppercase font-bold text-xs"
                        >
                          Edit
                        </button>
                        <span>•</span>
                        <button
                          type="button"
                          data-testid="btn-delete-review"
                          onClick={handleDelete}
                          className="text-red-500 hover:underline uppercase font-bold text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
