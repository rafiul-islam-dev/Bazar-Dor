
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import BackButton from "./components/BackButton";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
        {/* Logo */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
          <ShoppingCart size={32} strokeWidth={2.2} />
        </div>

        {/* Error Code */}
        <p className="mt-6 text-7xl font-black tracking-tight text-green-700">
          404
        </p>

        <h1 className="mt-4 text-2xl font-extrabold text-gray-900">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
          ঠিকানা ভুল হতে পারে অথবা পেজটি সরানো হয়েছে।
        </p>

        {/* Navigation Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            <ShoppingCart size={18} />
            হোম পেজে ফিরে যান
          </Link>

          <BackButton />
        </div>
      </div>
    </main>
  );
}
