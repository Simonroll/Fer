import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { getReviewsForProduct } from "@/lib/reviews";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  const product = products.find((p) => p.id === numId);

  if (!product || isNaN(numId)) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const reviewsData = await getReviewsForProduct(numId);
  return NextResponse.json(reviewsData, { status: 200 });
}
