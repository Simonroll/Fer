"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  const { user, loading } = useAuth();
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

  return (
    <div className="flex min-h-screen flex-col bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center bg-fixed relative">
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

      <header className="bg-white/95 border-b-2 border-[#d4af37] shadow-sm sticky top-0 z-10 relative">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <h1 className="text-xl font-bold text-[#bfa87e] uppercase tracking-wider">1999 Store</h1>
          <nav className="space-x-4">
            <Link href="/">
              <Button variant="outline" className="text-[#d4af37] border-[#d4af37]">Home</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center relative z-10 p-4">
        <Card data-testid="account-page" className="w-full max-w-md bg-white/95 border-[#d4af37] border-2 shadow-2xl rounded-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">My Account</CardTitle>
            <CardDescription className="text-center">Your secure profile information.</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Email Address</p>
              <p data-testid="account-email" className="text-lg font-bold text-gray-900">
                {user.email}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
