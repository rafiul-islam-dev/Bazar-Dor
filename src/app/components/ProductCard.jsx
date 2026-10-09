
import Link from "next/link";
import { formatPrice, normalizeProduct } from "../lib/api";

export default function ProductCard({ product: rawProduct }) {
  const product = normalizeProduct(rawProduct);

  const isUp = product.changeDirection === "up";
  const isDown = product.changeDirection === "down";

  const changeColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-600"
      : "text-gray-500";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";
  const percentage = Math.abs(Number(product.change) || 0);

  const unitLabel =
    product.unit === "kg" || product.unit === "কেজি"
      ? "প্রতি কেজি"
      : product.unit === "piece" ||
          product.unit === "pieces" ||
          product.unit === "পিস"
        ? "প্রতি পিস"
        : product.unit === "liter" || product.unit === "লিটার"
          ? "প্রতি লিটার"
          : `প্রতি ${product.unit}`;

  return (
    <Link
      href={`/product/${encodeURIComponent(product.slug)}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md sm:p-5"
    >
      {/* Top row: Icon left, name and unit right */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl sm:h-14 sm:w-14 sm:text-3xl">
          {product.emoji}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-gray-900 sm:text-lg">
            {product.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {unitLabel}
          </p>
        </div>
      </div>

      {/* Bottom row: Today's price left, percentage right */}
      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500 sm:text-sm">
            আজকের দাম
          </p>

          <p className="mt-1 text-xl font-extrabold text-gray-900 sm:text-2xl">
            {formatPrice(product.price)}
            <span className="ml-1 text-sm font-bold">টাকা</span>
          </p>
        </div>

        <p
          className={`whitespace-nowrap text-sm font-semibold sm:text-[13px] ${changeColor}`}
        >
          {changeIcon} {percentage.toLocaleString("bn-BD")}%
        </p>
      </div>
    </Link>
  );
}
