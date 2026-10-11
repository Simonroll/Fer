import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { products } from "@/lib/products";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  return products.map((p) => ({
    id: p.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const numId = parseInt(id, 10);
  const product = products.find((p) => p.id === numId);

  if (!product) {
    return {
      title: "Product Not Found | 1999 Store",
    };
  }

  return {
    title: `${product.name} | 1999 Store`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = parseInt(id, 10);

  if (isNaN(numId)) {
    notFound();
  }

  const product = products.find((p) => p.id === numId);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center bg-fixed relative">
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl relative z-10">
        <div className="mb-6">
          <Link href="/" data-testid="link-back">
            <Button
              variant="outline"
              className="bg-white/90 text-[#bfa87e] border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] rounded-none uppercase font-bold tracking-wider text-xs"
            >
              ← Back to Products
            </Button>
          </Link>
        </div>

        <div
          data-testid="product-detail"
          className="bg-white/95 border-[#d4af37] border-2 shadow-2xl rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8"
        >
          {/* Product Image */}
          <div className="relative aspect-square w-full rounded-sm overflow-hidden border-2 border-[#d4af37] bg-gray-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute top-3 right-3 z-10">
              <FavoriteButton productId={product.id} />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-amber-50 border border-[#d4af37] rounded-none">
                <span
                  data-testid="detail-category"
                  className="text-xs font-bold uppercase tracking-widest text-[#bfa87e]"
                >
                  {product.category}
                </span>
              </div>

              <h1
                data-testid="detail-name"
                className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight"
              >
                {product.name}
              </h1>

              <p
                data-testid="detail-price"
                className="text-3xl font-extrabold text-[#bfa87e]"
              >
                ${product.price.toFixed(2)}
              </p>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-xs uppercase font-bold tracking-wider text-gray-500 mb-2">
                  Description
                </h3>
                <p
                  data-testid="detail-description"
                  className="text-base text-gray-700 leading-relaxed"
                >
                  {product.description}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <Button className="flex-1 bg-[#2a2622] text-[#d4af37] border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] rounded-none uppercase font-bold tracking-wider py-6">
                  Add to Cart
                </Button>
                <FavoriteButton productId={product.id} className="h-12 w-12" />
              </div>
            </div>
          </div>
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
