
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const result = await signOut();

      if (result?.error) {
        console.error("Sign out failed:", result.error);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setSigningOut(false);
    }
  }

  // Avoid showing the wrong buttons while checking the session.
  if (isPending) {
    return <div className="h-10 w-24" aria-hidden="true" />;
  }

  // Logged-in user
  if (session?.user) {
    const user = session.user;

    const initial = (user.name || user.email || "U")
      .trim()
      .charAt(0)
      .toUpperCase();

    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/profile"
          className="flex min-w-0 items-center gap-2 rounded-lg p-1 transition hover:bg-green-50"
          aria-label="আমার প্রোফাইল"
        >
          {user.image ? (
            <img
              src={user.image}
              alt=""
              className="h-9 w-9 shrink-0 rounded-full border border-gray-200 object-cover"
            />
          ) : (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-800">
              {initial}
            </span>
          )}

          <span className="max-w-24 truncate text-sm font-semibold text-gray-800 sm:max-w-40">
            {user.name || "ব্যবহারকারী"}
          </span>
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="shrink-0 rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {signingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
        </button>
      </div>
    );
  }


  // Logged-out user
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/sign-in"
        className="hidden rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-700 sm:block"
      >
        সাইন ইন
      </Link>

      <Link
        href="/sign-up"
        className="rounded-md bg-[#087f42] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#056b36]"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
