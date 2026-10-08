import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import AuthButtons from "./AuthButtons";
import PriceTicker from "./PriceTicker";
import BanglaDate from "./BanglaDate";

const categories = [
  {
    name: "চাল",
    slug: "chal",
  },
  {
    name: "ডাল",
    slug: "dal",
  },
  {
    name: "তেল",
    slug: "tel",
  },
  {
    name: "সবজি",
    slug: "sobji",
  },
  {
    name: "মাছ",
    slug: "mach",
  },
  {
    name: "মাংস",
    slug: "mangsho",
  },
  {
    name: "ডিম",
    slug: "dim",
  },
];

export default function Navbar() {
  return (
    <header className="bg-white">
      {/* =========================
          Top Navbar
      ========================== */}

      <div className="container flex min-h-[76px] items-center justify-between gap-4 py-3">
        {/* Logo */}

        <Link
          href="/"
          className="flex min-w-0 items-center gap-2"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#087f42] text-white">
            <ShoppingCart
              size={21}
              strokeWidth={2.4}
            />
          </div>

          <div className="min-w-0">
            <h1 className="text-[18px] font-black leading-none text-[#172018] sm:text-[19px]">
              বাজার দর
            </h1>

            <p className="mt-1 text-[9px] leading-none text-slate-500 sm:text-[10px]">
              প্রয়োজনীয় পণ্যের দাম এক নজরে
            </p>

            <BanglaDate />
          </div>
        </Link>

        {/* Auth */}

        <div className="shrink-0">
          <AuthButtons />
        </div>
      </div>

      {/* =========================
          Category Navigation
      ========================== */}

      <nav className="border-y border-slate-100 bg-white">
        <div className="container">
          <div className="flex gap-1 overflow-x-auto py-2">
            {categories.map((category, index) => {
              const active = index === 0;

              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className={[
                    "whitespace-nowrap rounded-md px-4 py-1.5",
                    "text-sm font-semibold transition",
                    active
                      ? "bg-[#087f42] text-white"
                      : "text-slate-700 hover:bg-green-50 hover:text-green-700",
                  ].join(" ")}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* =========================
          Price Ticker
      ========================== */}

      <PriceTicker />
    </header>
  );
}