
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

function normalizeTickerProduct(product) {
  const change =
    typeof product.change === "object" && product.change !== null
      ? product.change
      : {};

  const price = Number(product.today ?? product.price ?? 0);

  const percentage = Number(
    typeof product.change === "object" && product.change !== null
      ? change.pct ?? 0
      : product.change ?? 0
  );

  const direction =
    change.dir ??
    (percentage > 0 ? "up" : percentage < 0 ? "down" : "flat");

  return {
    id: product.id ?? product.slug,
    slug: product.slug ?? product.id,
    name:
      product.nameBn ??
      product.name ??
      product.title ??
      "অজানা পণ্য",
    price,
    percentage,
    direction,
    unit: product.unit ?? "kg",
  };
}

function formatBanglaNumber(value) {
  return Number(value).toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  });
}

function getUnitLabel(unit) {
  if (unit === "kg") return "প্রতি কেজি";
  if (unit === "piece" || unit === "pieces") return "প্রতি পিস";
  if (unit === "liter") return "প্রতি লিটার";

  return `প্রতি ${unit}`;
}

export default function PriceTicker({ products: initialProducts = [] }) {
  const { data: session, isPending } = useSession();

  const [products, setProducts] = useState(() =>
    initialProducts.map(normalizeTickerProduct)
  );

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("পণ্যের তথ্য লোড করা যায়নি");
        }

        const result = await response.json();

        const items = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.products)
              ? result.products
              : [];

        if (!cancelled && items.length > 0) {
          setProducts(items.map(normalizeTickerProduct));
        }
      } catch (error) {
        console.error("Price ticker error:", error);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  if (products.length === 0) {
    return (
      <div className="border-b border-gray-100 bg-gray-50 py-3">
        <div className="container text-sm text-gray-500">
          বাজারদরের তথ্য লোড হচ্ছে...
        </div>
      </div>
    );
  }

  return (
    <div className="ticker-mask border-b border-gray-100 bg-gray-50 py-3">
      <div className="ticker-track">
        {[...products, ...products].map((product, index) => {
          const isUp = product.direction === "up";
          const isDown = product.direction === "down";

          const color = isUp
            ? "text-red-600"
            : isDown
              ? "text-green-600"
              : "text-gray-500";

          const arrow = isUp ? "▲" : isDown ? "▼" : "—";

          const productSlug = product.slug ?? product.id;

          const detailsPath = `/product/${encodeURIComponent(
            String(productSlug)
          )}`;

          const destination = isPending
            ? "#"
            : session
              ? detailsPath
              : `/sign-in?callbackURL=${encodeURIComponent(detailsPath)}`;

          return (
            <Link
              key={`${product.id}-${index}`}
              href={destination}
              onClick={(event) => {
                if (isPending) {
                  event.preventDefault();
                }
              }}
              aria-disabled={isPending}
              title={
                isPending
                  ? "লগইন যাচাই হচ্ছে..."
                  : session
                    ? `${product.name} - বিস্তারিত দেখুন`
                    : "বিস্তারিত দেখতে লগইন করুন"
              }
              className={`mx-5 flex shrink-0 items-center gap-2 text-sm transition-opacity hover:opacity-70 ${
                isPending ? "cursor-wait" : "cursor-pointer"
              }`}
            >
              <span className="font-medium text-gray-800">
                {product.name}
              </span>

              <span className="font-bold text-gray-900">
                {formatBanglaNumber(product.price)} টাকা
              </span>

              <span className="text-gray-500">
                {getUnitLabel(product.unit)}
              </span>

              <span className={`font-bold ${color}`}>
                {arrow}{" "}
                {formatBanglaNumber(Math.abs(product.percentage))}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
