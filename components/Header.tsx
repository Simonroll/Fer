"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";

export function Header() {
  const { user, signOut } = useAuth();
  const { favorites } = useFavorites();

  return (
    <header className="bg-white/95 border-b-2 border-[#d4af37] shadow-sm sticky top-0 z-20 relative">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <Link href="/" className="text-xl font-bold text-[#bfa87e] uppercase tracking-wider hover:opacity-90">
          1999 Store
        </Link>
        <nav className="space-x-4 flex items-center">
          {user ? (
            <>
              <Link
                href="/favorites"
                data-testid="link-favorites"
                className="flex items-center text-sm font-semibold text-gray-700 hover:text-[#bfa87e] mr-2"
              >
                <span>Favorites (</span>
                <span data-testid="favorites-count">{favorites.length}</span>
                <span>)</span>
              </Link>
              <Link
                href="/account"
                className="text-sm font-medium text-gray-700 hover:underline mr-2"
              >
                <span data-testid="user-email">{user.email}</span>
              </Link>
              <Button
                onClick={() => signOut()}
                data-testid="btn-logout"
                className="bg-transparent text-[#d4af37] border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] rounded-none uppercase font-bold tracking-wider text-xs px-3 py-1.5"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" data-testid="btn-login">
                <Button className="bg-transparent text-[#d4af37] border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] rounded-none uppercase font-bold tracking-wider">
                  Login
                </Button>
              </Link>
              <Link href="/register" data-testid="btn-register">
                <Button className="bg-[#2a2622] text-[#d4af37] border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] rounded-none uppercase font-bold tracking-wider">
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
