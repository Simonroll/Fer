"use client";

import { useFavorites } from "@/contexts/FavoritesContext";
import { Button } from "@/components/ui/button";

export function FavoriteButton({
  productId,
  className = "",
}: {
  productId: number;
  className?: string;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(productId);

  return (
    <Button
      type="button"
      data-testid="btn-favorite"
      aria-pressed={favorited ? "true" : "false"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(productId);
      }}
      className={`transition-colors flex items-center justify-center p-2 rounded-full ${
        favorited
          ? "bg-red-50 text-red-600 border border-red-300 hover:bg-red-100"
          : "bg-white/80 text-gray-400 border border-gray-200 hover:text-red-500 hover:bg-white"
      } ${className}`}
      title={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={favorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </Button>
  );
}
