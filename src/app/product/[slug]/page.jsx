
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProduct, formatPrice } from "../../lib/api";

function LoadingDetails() {
    return (
        <main className="container py-12">
            <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-8">
                <div className="h-6 w-32 rounded bg-gray-200" />
                <div className="mt-6 h-10 w-2/3 rounded bg-gray-200" />
                <div className="mt-4 h-24 rounded bg-gray-100" />
            </div>
        </main>
    );
}

async function ProductDetailsContent({ params }) {
    const { slug } = await params;

    let product;

    try {
        product = await getProduct(slug);
    } catch {
        notFound();
    }

    if (!product || product.name === "অজানা পণ্য") {
        notFound();
    }

    const isUp = product.changeDirection === "up";
    const isDown = product.changeDirection === "down";

    const changeColor = isUp
        ? "text-red-600"
        : isDown
            ? "text-green-600"
            : "text-gray-500";

    const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

    const unitLabel =
        product.unit === "kg" || product.unit === "কেজি"
            ? "কেজি"
            : product.unit === "piece" ||
                product.unit === "pieces" ||
                product.unit === "পিস"
                ? "পিস"
                : product.unit === "liter" ||
                    product.unit === "লিটার"
                    ? "লিটার"
                    : product.unit;

    const today = Number(product.price ?? product.today ?? 0);
    const yesterday = Number(product.yesterday ?? 0);
    const difference = today - yesterday;

    const differenceText =
        difference > 0
            ? `গতকালের তুলনায় আজ দাম বেড়েছে ${difference.toLocaleString("bn-BD")} টাকা`
            : difference < 0
                ? `গতকালের তুলনায় আজ দাম কমেছে ${Math.abs(difference).toLocaleString("bn-BD")} টাকা`
                : "গতকালের তুলনায় আজ দামের পরিবর্তন নেই";

    const markets = Array.isArray(product.markets)
        ? product.markets
        : [];

    const validMarkets = markets.filter(
        (market) =>
            Number.isFinite(Number(market.min)) &&
            Number.isFinite(Number(market.max))
    );

    const lowestMarket = validMarkets.length
        ? validMarkets.reduce((lowest, market) =>
            Number(market.min) < Number(lowest.min) ? market : lowest
        )
        : null;

    const highestMarket = validMarkets.length
        ? validMarkets.reduce((highest, market) =>
            Number(market.max) > Number(highest.max) ? market : highest
        )
        : null;

    const averagePrice = validMarkets.length
        ? validMarkets.reduce(
            (sum, market) =>
                sum + (Number(market.min) + Number(market.max)) / 2,
            0
        ) / validMarkets.length
        : 0;

    const formatTaka = (price) =>
        `${Number(price).toLocaleString("bn-BD", {
            maximumFractionDigits: 2,
        })} টাকা`;

    return (
        <main className="container min-h-screen py-8 pb-16">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
            >
                <span aria-hidden="true">←</span>
                বাজারে ফিরে যান
            </Link>

            {/* Product overview and current price */}
            <div className="mt-6 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
                {/* Left: Product information */}
                <section className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:gap-7 sm:p-8">
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-green-50 sm:h-40 sm:w-40">
                        <span
                            className="text-6xl sm:text-8xl"
                            role="img"
                            aria-label={product.name}
                        >
                            {product.emoji}
                        </span>
                    </div>

                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-green-700">
                            {product.category || "বাজারের পণ্য"}
                        </p>

                        <h1 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                            {product.name}
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            প্রতি {unitLabel} {product.name}
                        </p>

                        <p
                            className={`mt-4 text-sm font-semibold leading-6 ${
                                difference > 0
                                    ? "text-red-600"
                                    : difference < 0
                                        ? "text-green-600"
                                        : "text-gray-500"
                            }`}
                        >
                            {differenceText}
                        </p>
                    </div>
                </section>

                {/* Right: Today's price */}
                <section className="flex flex-col justify-center rounded-2xl border border-green-100 bg-white p-6 sm:p-8">
                    <p className="text-sm font-semibold text-gray-500">
                        আজকের দাম
                    </p>

                    <p className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        {formatPrice(today)}
                        <span className="ml-2 text-base font-bold">টাকা</span>
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        টাকা/{unitLabel}
                    </p>

                    <div className="mt-5 border-t border-gray-100 pt-4">
                        <p className={`text-lg font-bold ${changeColor}`}>
                            {changeIcon}{" "}
                            {Math.abs(Number(product.change) || 0).toLocaleString("bn-BD")}%
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            গত সপ্তাহের তুলনায় দামের পরিবর্তন
                        </p>
                    </div>
                </section>
            </div>

            {/* Price summary - separate section */}
            <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">
                    দামের সারসংক্ষেপ
                </h2>

                {validMarkets.length > 0 ? (
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                            <p className="text-sm font-semibold text-green-800">
                                সর্বনিম্ন দাম
                            </p>
                            <p className="mt-3 text-2xl font-extrabold text-green-700">
                                {formatTaka(lowestMarket.min)}
                            </p>
                            <p className="mt-3 text-xs text-gray-500">
                                সবচেয়ে কম দামের বাজার
                            </p>
                            <p className="mt-1 font-bold text-gray-800">
                                {lowestMarket.market}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                {lowestMarket.division}
                            </p>
                        </div>

                        <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                            <p className="text-sm font-semibold text-red-800">
                                সর্বাধিক দাম
                            </p>
                            <p className="mt-3 text-2xl font-extrabold text-red-600">
                                {formatTaka(highestMarket.max)}
                            </p>
                            <p className="mt-3 text-xs text-gray-500">
                                সবচেয়ে বেশি দামের বাজার
                            </p>
                            <p className="mt-1 font-bold text-gray-800">
                                {highestMarket.market}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                {highestMarket.division}
                            </p>
                        </div>

                        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                            <p className="text-sm font-semibold text-blue-800">
                                গড় দাম
                            </p>
                            <p className="mt-3 text-2xl font-extrabold text-blue-700">
                                {formatTaka(averagePrice)}
                            </p>
                            <p className="mt-3 text-xs text-gray-500">
                                প্রতি {unitLabel}-এর হিসাবে
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-700">
                                সব বাজারের গড়
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="mt-4 text-sm text-gray-500">
                        দামের সারসংক্ষেপ দেখানোর মতো বাজারের তথ্য পাওয়া যায়নি।
                    </p>
                )}
            </section>

            {/* Market-wise prices */}
            <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    বাজারভিত্তিক আজকের দাম
                </h2>

                {markets.length > 0 ? (
                    <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full min-w-[700px] border-collapse text-left">
                            <thead>
                                <tr className="bg-green-50 text-sm text-gray-700">
                                    <th className="px-4 py-4 font-bold">বাজার</th>
                                    <th className="px-4 py-4 font-bold">বিভাগ</th>
                                    <th className="px-4 py-4 text-right font-bold">
                                        সর্বনিম্ন
                                    </th>
                                    <th className="px-4 py-4 text-right font-bold">
                                        সর্বাধিক
                                    </th>
                                    <th className="px-4 py-4 text-right font-bold">
                                        গড়
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {markets.map((market, index) => {
                                    const min = Number(market.min);
                                    const max = Number(market.max);
                                    const average = (min + max) / 2;

                                    return (
                                        <tr
                                            key={`${market.market}-${index}`}
                                            className="border-t border-gray-100 transition hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-4 font-semibold text-gray-900">
                                                {market.market}
                                            </td>
                                            <td className="px-4 py-4 text-gray-600">
                                                {market.division}
                                            </td>
                                            <td className="px-4 py-4 text-right font-medium text-green-700">
                                                {min.toLocaleString("bn-BD")}
                                            </td>
                                            <td className="px-4 py-4 text-right font-medium text-red-600">
                                                {max.toLocaleString("bn-BD")}
                                            </td>
                                            <td className="px-4 py-4 text-right font-bold text-gray-900">
                                                {average.toLocaleString("bn-BD", {
                                                    minimumFractionDigits: 1,
                                                    maximumFractionDigits: 1,
                                                })}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="mt-6 rounded-xl bg-gray-50 p-6 text-center text-gray-500">
                        এই পণ্যের বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
                    </p>
                )}
            </section>
        </main>
    );
}

export default function ProductDetailsPage({ params }) {
    return (
        <Suspense fallback={<LoadingDetails />}>
            <ProductDetailsContent params={params} />
        </Suspense>
    );
}
