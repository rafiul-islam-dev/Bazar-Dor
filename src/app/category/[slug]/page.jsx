import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import CategoryProducts from "./CategoryProducts";

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

      <CategoryProducts
        category={category}
        products={products}
      />
    </main>
  );
}
