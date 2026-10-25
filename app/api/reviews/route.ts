import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { products } from "@/lib/products";
import { reviewSchema } from "@/lib/reviewSchema";

export async function POST(request: Request) {
  // 1. Authentication check
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.substring(7).trim();
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: userData, error: authError } = await supabase.auth.getUser(token);
  if (authError || !userData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Validation check (JSON & Schema)
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid input", issues: [{ message: "Body must be valid JSON" }] },
      { status: 400 }
    );
  }

  const parsed = reviewSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { product_id, rating, comment } = parsed.data;

  // 3. Product existence check
  const productExists = products.some((p) => p.id === product_id);
  if (!productExists) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // 4. Create user-scoped Supabase client (Row Level Security applied)
  const userSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  // 5. Insert into reviews (user_id and author come from DB defaults)
  const { data, error } = await userSupabase
    .from("reviews")
    .insert({
      product_id,
      rating,
      comment,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "You already reviewed this product" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // 6. Revalidate cache for the detail page
  revalidatePath("/products/" + product_id);

  return NextResponse.json(data, { status: 201 });
}
