"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center bg-fixed relative">
      {/* Overlay to make content more readable */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

      {/* Header */}
      <header className="bg-white/95 border-b-2 border-[#d4af37] shadow-sm sticky top-0 z-10 relative">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <h1 className="text-xl font-bold text-[#bfa87e] uppercase tracking-wider">1999 Store</h1>
          <nav className="space-x-4 flex items-center">
            {user ? (
              <>
                <span data-testid="user-email" className="text-sm font-medium text-gray-700 mr-4">
                  {user.email}
                </span>
                <Button 
                  onClick={() => signOut()} 
                  data-testid="btn-logout" 
                  className="bg-transparent text-[#d4af37] border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] rounded-none uppercase font-bold tracking-wider"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" data-testid="btn-login">
                  <Button className="bg-transparent text-[#d4af37] border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] rounded-none uppercase font-bold tracking-wider">Login</Button>
                </Link>
                <Link href="/register" data-testid="btn-register">
                  <Button className="bg-[#2a2622] text-[#d4af37] border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] rounded-none uppercase font-bold tracking-wider">Register</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content - Product List */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <div 
          data-testid="product-list" 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
