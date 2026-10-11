import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      data-testid="product-card"
      className="overflow-hidden flex flex-col h-full bg-white/95 border-[#d4af37] border-2 shadow-xl rounded-sm relative group"
    >
      <div className="relative w-full aspect-square bg-gray-100 border-b-2 border-[#d4af37]">
        <Link href={`/products/${product.id}`} data-testid="link-detail">
          <Image
            data-testid="product-image"
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </Link>
        {/* Heart Favorite Button */}
        <div className="absolute top-2 right-2 z-10">
          <FavoriteButton productId={product.id} />
        </div>
      </div>
      <CardHeader className="flex-grow">
        <Link href={`/products/${product.id}`}>
          <CardTitle
            data-testid="product-name"
            className="text-lg line-clamp-1 hover:text-[#bfa87e] transition-colors"
          >
            {product.name}
          </CardTitle>
        </Link>
        <CardDescription
          data-testid="product-description"
          className="line-clamp-2"
        >
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 flex items-center justify-between">
        <p
          data-testid="product-price"
          className="text-xl font-bold text-gray-900"
        >
          ${product.price.toFixed(2)}
        </p>
        <Link
          href={`/products/${product.id}`}
          className="text-xs uppercase font-bold text-[#bfa87e] hover:underline"
        >
          View Details →
        </Link>
      </CardContent>
    </Card>
  );
}
