import Link from "next/link";
import Image from "next/image";
import BanglaDate from "./components/BanglaDate";

import ProductCard from "./components/ProductCard";
import { getProducts } from "./lib/api";

export default async function HomePage() {
  let products = [];
  let error = null;

  try {
    products = await getProducts();
  } catch (err) {
    console.error(
      "Failed to fetch products:",
      err
    );

    error =
      "পণ্যের তথ্য এখন পাওয়া যাচ্ছে না।";
  }

  const risers = [...products]
    .filter((product) => product.change > 0)
    .sort(
      (a, b) => b.change - a.change
    )
    .slice(0, 6);

  const fallers = [...products]
    .filter((product) => product.change < 0)
    .sort(
      (a, b) =>
        Math.abs(b.change) -
        Math.abs(a.change)
    )
    .slice(0, 6);

  return (
    <main>
      {/* =========================
          Hero
      ========================== */}

      <section className="container py-10 sm:py-14">
        <div className="overflow-hidden rounded-2xl bg-[#e8f3e9]">
          <div className="grid items-center gap-8 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:px-14 lg:py-14">
              <div className="mb-4">
                <div className="inline-flex items-center rounded-2xl bg-gray-100 px-4 py-2">
                  <BanglaDate />
                </div>

              <h1 className="mt-3 max-w-xl text-2xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                আজকের বাজারের দাম এক নজরে
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
                চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ
                প্রয়োজনীয় পণ্যের আজকের বাজারদর
                সহজেই দেখুন।
              </p>

              <Link
                href="#সব-পণ্য"
                className="btn btn-primary mt-6"
              >
                সব পণ্য দেখুন
              </Link>
            </div>

            <div className="flex min-h-[220px] items-center justify-center lg:justify-end">
              <div className="text-[130px] leading-none sm:text-[170px]">

                <div className="relative mx-auto w-full max-w-lg">
                  <Image
                    src="/bazar-hero.png"
                    alt="বাজার দর — নিত্যপ্রয়োজনীয় পণ্য"
                    width={700}
                    height={600}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          API Error
      ========================== */}

      {error && (
        <section className="container pb-8">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm font-medium text-red-600">
            {error}
          </div>
        </section>
      )}

      {/* =========================
          Price Riser
      ========================== */}

      {risers.length > 0 && (
        <section className="container pb-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="section-title">
                <span className=" text-red-500">
                  ▲ {" "}
                </span>
                আজ দাম বেড়েছে
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                আজ যেসব পণ্যের দাম সবচেয়ে বেশি
                বেড়েছে।
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>
      )}

      {/* =========================
          Price Faller
      ========================== */}

      {fallers.length > 0 && (
        <section className="container pb-10">
          <div className="mb-5">
            <h2 className="section-title">
              <span className="text-green-600">
                ▼ {" "}
              </span>
              আজ দাম কমেছে
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              আজ যেসব পণ্যের দাম সবচেয়ে বেশি
              কমেছে।
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>
      )}

      {/* =========================
          All Products
      ========================== */}

      <section
        id="সব-পণ্য"
        className="container scroll-mt-8 pb-16"
      >
        <div className="mb-5">
          <h2 className="section-title">
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            প্রয়োজনীয় সব পণ্যের আজকের বাজারদর
            দেখুন।
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
          !error && (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
              কোনো পণ্য পাওয়া যায়নি।
            </div>
          )
        )}
      </section>
    </main>
  );
}