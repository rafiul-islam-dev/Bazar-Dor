
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SocialAuthButtons() {
    const router = useRouter();
    const [loadingProvider, setLoadingProvider] = useState("");

    async function handleSocialSignIn(provider) {
        if (loadingProvider) return;

        setLoadingProvider(provider);

        try {
            const params = new URLSearchParams(window.location.search);
            const requested = params.get("callbackURL");

            const callbackURL =
                requested &&
                    requested.startsWith("/") &&
                    !requested.startsWith("//")
                    ? requested
                    : "/profile";

            const result = await authClient.signIn.social({
                provider,
                callbackURL,
            });

            if (result?.error) {
                toast.error(
                    result.error.message || "লগইন করা যায়নি। আবার চেষ্টা করুন।"
                );
                setLoadingProvider("");
            }
        } catch {
            toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
            setLoadingProvider("");
        }
    }

    return (
        <div className="space-y-3">
            <button
                type="button"
                onClick={() => handleSocialSignIn("google")}
                disabled={Boolean(loadingProvider)}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <span className="text-lg font-black text-blue-600" aria-hidden="true">
                    G
                </span>
                {loadingProvider === "google"
                    ? "Google-এ যাচ্ছেন..."
                    : "Google দিয়ে চালিয়ে যান"}
            </button>


            <button
                type="button"
                onClick={() => handleSocialSignIn("github")}
                disabled={Boolean(loadingProvider)}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <span
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white"
                    aria-hidden="true"
                >
                    GH
                </span>

                {loadingProvider === "github"
                    ? "GitHub-এ যাচ্ছেন..."
                    : "GitHub দিয়ে চালিয়ে যান"}
            </button>

        </div>
    );
}
