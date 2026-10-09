"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Suspense } from "react";

import AuthButtons from "./AuthButtons";
import PriceTicker from "./PriceTicker";
import BanglaDate from "./BanglaDate";

const BASE_URL =
  "https://api.api-store.workers.dev/api/bazardor";

const fallbackCategories = [
  { id: "chal", name: "চাল", slug: "chal", icon: "🍚" },
  { id: "dal", name: "ডাল", slug: "dal", icon: "🫘" },
  { id: "tel", name: "তেল", slug: "tel", icon: "🛢️" },
  { id: "sobji", name: "সবজি", slug: "sobji", icon: "🥬" },
  { id: "mach", name: "মাছ", slug: "mach", icon: "🐟" },
  { id: "mangsho", name: "মাংস", slug: "mangsho", icon: "🍗" },
  { id: "dim-dui", name: "ডিম-দুধ", slug: "dim-dui", icon: "🥛" },
  { id: "mosla", name: "মসলা", slug: "mosla", icon: "🌶️" },
];

function getArray(response, key) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.[key])) return response[key];
  return [];
}

function normalizeCategory(category) {
  if (typeof category === "string") {
    return {
      name: category,
      slug: category,
      icon: "🛒",
    };
  }

  const name =
    category?.nameBn ??
    category?.name ??
    category?.title ??
    category?.category ??
    "";

  const slug =
    category?.slug ??
    category?.category_slug ??
    category?.id ??
    "";

  return {
    name: String(name),
    slug: String(slug),
    icon: category?.icon ?? "🛒",
  };
}

function NavbarContent() {
  const pathname = usePathname();

  const [categories, setCategories] = useState(
    fallbackCategories
  );

  const [products, setProducts] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function loadNavbarData() {
      try {
        const [categoryResponse, productResponse] =
          await Promise.all([
            fetch(`${BASE_URL}/categories`),
            fetch(`${BASE_URL}/products`),
          ]);

        if (!categoryResponse.ok || !productResponse.ok) {
          throw new Error("Failed to load navbar data");
        }

        const categoryJson = await categoryResponse.json();
        const productJson = await productResponse.json();

        const categoryItems = getArray(
          categoryJson,
          "categories"
        )
          .map(normalizeCategory)
          .filter((item) => item.name && item.slug);

        const productItems = getArray(
          productJson,
          "products"
        );

        if (!cancelled) {
          if (categoryItems.length > 0) {
            setCategories(categoryItems);
          }

          setProducts(productItems);
        }
      } catch (error) {
        console.error("Navbar API error:", error);
      }
    }

    loadNavbarData();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="bg-white">
      {/* Logo and authentication */}

      <div className="container flex min-h-[76px] items-center justify-between gap-3 py-3">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#087f42] text-white">
            <ShoppingCart size={21} strokeWidth={2.4} />
          </div>

          <div className="min-w-0">
            <h1 className="text-lg font-black leading-tight text-[#172018]">
              বাজার দর
            </h1>

            <BanglaDate />
          </div>
        </Link>

        <AuthButtons />
      </div>

      {/* Dynamic category navigation */}

      <nav
        aria-label="পণ্যের ক্যাটাগরি"
        className="border-y border-slate-100 bg-white"
      >
        <div className="container">
          <div className="flex gap-1 overflow-x-auto py-2">
            <Link
              href="/"
              className={`shrink-0 whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold transition ${
                pathname === "/"
                  ? "bg-[#087f42] text-white"
                  : "text-slate-700 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              সব
            </Link>

            {categories.map((category) => {
              const href = `/category/${encodeURIComponent(
                category.slug
              )}`;

              const active = pathname === href;

              return (
                <Link
                  key={category.slug}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`shrink-0 whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-[#087f42] text-white"
                      : "text-slate-700 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Live API price ticker */}

      <PriceTicker products={products} />
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-16"
          aria-hidden="true"
        />
      }
    >
      <NavbarContent />
    </Suspense>
  );
}