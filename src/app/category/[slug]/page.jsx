
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import ProductCard from "../../components/ProductCard";
import {
  getCategories,
  getProductsByCategory,
} from "../../lib/api";

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }) {
  return (
    <Suspense
      fallback={
        <main className="container py-10">
          <p className="text-slate-500">
            ক্যাটাগরির পণ্য লোড হচ্ছে...
          </p>
        </main>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }) {
  const { slug } = await params;

  let categories;
  let products;

  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }

  const category = categories.find(
    (item) => item.slug === slug
  );

  // Category slug does not exist
  if (!category) {
    notFound();
  }

  try {
    products = await getProductsByCategory(category.slug);
  } catch (error) {
    console.error("Failed to fetch category products:", error);
    throw error;
  }

  return (
    <main className="container py-10 sm:py-14">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-slate-500"
      >
        <Link
          href="/"
          className="transition hover:text-green-700"
        >
          হোম
        </Link>

        <span className="mx-2">/</span>

        <span className="text-slate-800">
          {category.nameBn}
        </span>
      </nav>

      {/* Category Header */}
      <section className="mb-8 rounded-2xl bg-[#e8f3e9] px-6 py-8 sm:px-10">
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm"
            aria-hidden="true"
          >
            {category.icon}
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
              {category.nameBn}
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              এই ক্যাটাগরির পণ্যের আজকের বাজারদর দেখুন।
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section aria-labelledby="category-products-title">
        <div className="mb-5">
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

        {products.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
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

            <Link
              href="/"
              className="btn btn-primary mt-5 inline-flex"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
