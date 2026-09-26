import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card data-testid="product-card" className="overflow-hidden flex flex-col h-full bg-white/95 border-[#d4af37] border-2 shadow-xl rounded-sm">
      <div className="relative w-full aspect-square bg-gray-100 border-b-2 border-[#d4af37]">
        <Image
          data-testid="product-image"
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <CardHeader className="flex-grow">
        <CardTitle data-testid="product-name" className="text-lg line-clamp-1">{product.name}</CardTitle>
        <CardDescription data-testid="product-description" className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p data-testid="product-price" className="text-xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
}
