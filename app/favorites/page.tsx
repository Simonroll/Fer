"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { products } from "@/lib/products";
import { Header } from "@/components/Header";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const { user, loading } = useAuth();
  const { favorites } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center bg-fixed relative">
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-10 max-w-5xl relative z-10">
        <div data-testid="favorites-page" className="space-y-6">
          <div className="bg-white/95 border-2 border-[#d4af37] p-6 shadow-md flex items-center justify-between rounded-sm">
            <div>
              <h1 className="text-2xl font-extrabold text-[#bfa87e] uppercase tracking-wider">
                My Favorites
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Your saved wishlist items backed by Supabase
              </p>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="text-[#bfa87e] border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] rounded-none uppercase font-bold text-xs"
              >
                Browse More
              </Button>
            </Link>
          </div>

          {favoriteProducts.length === 0 ? (
            <div
              data-testid="favorites-empty"
              className="bg-white/95 border-2 border-[#d4af37] p-12 text-center shadow-xl rounded-sm"
            >
              <p className="text-xl font-bold text-gray-700 mb-2">
                You have no favorite products yet.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Click the heart icon on any product to save it here.
              </p>
              <Link href="/">
                <Button className="bg-[#2a2622] text-[#d4af37] border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] rounded-none uppercase font-bold tracking-wider">
                  Discover Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {favoriteProducts.map((product) => (
                <Card
                  key={product.id}
                  data-testid="favorite-item"
                  className="bg-white/95 border-2 border-[#d4af37] shadow-md rounded-sm overflow-hidden flex flex-col sm:flex-row items-center p-4 gap-4"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-sm overflow-hidden border border-[#d4af37]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex-grow text-center sm:text-left space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#bfa87e] bg-amber-50 px-2 py-0.5 border border-[#d4af37] inline-block mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-base font-extrabold text-[#bfa87e]">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link href={`/products/${product.id}`}>
                      <Button
                        variant="outline"
                        className="text-xs uppercase font-bold text-[#bfa87e] border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] rounded-none"
                      >
                        View Details
                      </Button>
                    </Link>
                    <FavoriteButton productId={product.id} />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white/95 border-t-2 border-[#d4af37] mt-auto py-6 relative z-10">
        <div className="container mx-auto px-4 text-center text-gray-700 font-medium text-sm">
          &copy; {new Date().getFullYear()} 1999 Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
