
"use client";

import { useState } from "react";
import ProductCard from "../../components/ProductCard";

export default function CategoryProducts({ category, products }) {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "default") return 0;

    const priceA = Number(a.price ?? a.today ?? 0);
    const priceB = Number(b.price ?? b.today ?? 0);

    if (sortOrder === "low-to-high") {
      return priceA - priceB;
    }

    if (sortOrder === "high-to-low") {
      return priceB - priceA;
    }

    return 0;
  });

  return (
    <section aria-labelledby="category-products-title">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="category-products-title"
            className="section-title"
          >
            {category.nameBn} এর পণ্য
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            মোট {products.length}টি পণ্য পাওয়া গেছে।
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-1.5 sm:items-end">
          <label
            htmlFor="product-sort"
            className="text-sm font-semibold text-slate-700"
          >
            সাজান
          </label>

          <select
            id="product-sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="w-full min-w-48 cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:w-auto"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম কম থেকে বেশি</option>
            <option value="high-to-low">দাম বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-lg font-bold text-slate-800">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>

          <p className="mt-2 text-sm text-slate-500">
            পরে আবার চেষ্টা করুন।
          </p>
        </div>
      )}
    </section>
  );
}
