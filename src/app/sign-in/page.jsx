
"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import SocialAuthButtons from "../components/SocialAuthButtons";

function SignInForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get("callbackURL") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn.email({
                email,
                password,
            });

            if (result.error) {
                toast.error(
                    result.error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
                );
                return;
            }

            toast.success("সাইন ইন সফল হয়েছে!");

            // Return to the requested page after successful login.
            const safeCallbackURL =
                callbackURL.startsWith("/") &&
                    !callbackURL.startsWith("//")
                    ? callbackURL
                    : "/";

            router.push(safeCallbackURL);
            router.refresh();
        } catch {
            setError("লগইন করা যায়নি। আবার চেষ্টা করো।");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
                <div className="mb-8 text-center">
                    <Link
                        href="/"
                        className="mb-5 inline-block text-sm font-medium text-green-700 hover:underline"
                    >
                        ← বাজার দর
                    </Link>

                    <h1 className="text-3xl font-bold text-gray-900">
                        স্বাগতম!
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="আপনার ইমেইল লিখুন"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                        >
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
                    </button>
                </form>
                <div className="space-y-4 mt-4">

                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-sm text-gray-500">
                            অথবা
                        </span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>
                    <SocialAuthButtons />
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/sign-up"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </Link>
                </p>
            </div>
        </main>
    );
}

export default function SignInPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                    <p className="text-sm text-gray-600">
                        লগইন পেজ লোড হচ্ছে...
                    </p>
                </main>
            }
        >
            <SignInForm />
        </Suspense>
    );
}
