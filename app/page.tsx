import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

interface HomeProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const q = params?.q || "";
  const category = params?.category || "";

  // Extract unique categories for filter dropdown
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter products based on URL searchParams
  let filteredProducts = [...products];

  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (q) {
    const query = q.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center bg-fixed relative">
      {/* Background Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

      {/* Global Auth-Aware Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Search & Filter Form (Plain GET form driven by URL) */}
        <div className="mb-8 p-4 bg-white/95 border-2 border-[#d4af37] shadow-lg rounded-sm">
          <form method="get" action="/" className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <input
                type="text"
                name="q"
                data-testid="search-input"
                defaultValue={q}
                placeholder="Search products by name or description..."
                className="w-full px-4 py-2 bg-white border border-[#d4af37] text-gray-900 rounded-none focus:outline-none focus:ring-1 focus:ring-[#d4af37] text-sm"
              />
            </div>

            <div className="w-full md:w-64">
              <select
                name="category"
                data-testid="category-select"
                defaultValue={category}
                className="w-full px-4 py-2 bg-white border border-[#d4af37] text-gray-900 rounded-none focus:outline-none focus:ring-1 focus:ring-[#d4af37] text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              data-testid="btn-search"
              className="w-full md:w-auto bg-[#2a2622] text-[#d4af37] border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] rounded-none uppercase font-bold tracking-wider px-6"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Product Grid or No Results */}
        {filteredProducts.length === 0 ? (
          <div
            data-testid="no-results"
            className="p-12 text-center bg-white/95 border-2 border-[#d4af37] shadow-xl rounded-sm my-8"
          >
            <h2 className="text-2xl font-bold text-[#bfa87e] uppercase tracking-wider mb-2">
              No products found
            </h2>
            <p className="text-gray-600 text-sm">
              Try adjusting your search query or category filter.
            </p>
          </div>
        ) : (
          <div
            data-testid="product-list"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white/95 border-t-2 border-[#d4af37] mt-auto py-6 relative z-10">
        <div className="container mx-auto px-4 text-center text-gray-700 font-medium text-sm">
          &copy; {new Date().getFullYear()} 1999 Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
