
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfileForm({ user }) {
    const router = useRouter();

    const [name, setName] = useState(user.name || "");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [saving, setSaving] = useState(false);
    const [signingOut, setSigningOut] = useState(false);

    const initial = (user.name || user.email || "U")
        .trim()
        .charAt(0)
        .toUpperCase();

    async function handleSave(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        const trimmedName = name.trim();

        if (!trimmedName) {
            setError("তোমার নাম লিখো।");
            return;
        }

        if (trimmedName.length > 100) {
            setError("নাম ১০০ অক্ষরের মধ্যে রাখো।");
            return;
        }

        setSaving(true);

        try {
            const result = await authClient.updateUser({
                name: trimmedName,
            });

            if (result.error) {
                setError(
                    result.error.message || "নাম আপডেট করা যায়নি।"
                );
                return;
            }

            setName(trimmedName);
            setSuccess("তোমার তথ্য সফলভাবে সংরক্ষণ করা হয়েছে।");
            router.refresh();
        } catch {
            setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করো।");
        } finally {
            setSaving(false);
        }
    }

    async function handleSignOut() {
        setError("");
        setSigningOut(true);

        try {
            const result = await authClient.signOut();

            if (result.error) {
                setError("সাইন আউট করা যায়নি। আবার চেষ্টা করো।");
                return;
            }

            router.replace("/sign-in");
            router.refresh();
        } catch {
            setError("সাইন আউট করা যায়নি। আবার চেষ্টা করো।");
        } finally {
            setSigningOut(false);
        }
    }

    return (
        <div className="mt-8">
            {/* User information */}
            <section className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-7">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt={`${user.name || "User"}-এর প্রোফাইল ছবি`}
                            className="h-16 w-16 shrink-0 rounded-full border border-gray-200 object-cover"
                        />
                    ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-800">
                            {initial}
                        </div>
                    )}

                    <div className="min-w-0">
                        <h2 className="truncate text-lg font-bold text-gray-900">
                            {user.name || "নাম দেওয়া হয়নি"}
                        </h2>
                        <p className="mt-1 break-all text-sm text-gray-500">
                            {user.email}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signingOut || saving}
                    className="shrink-0 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                </button>
            </section>

            {/* Editable information */}
            <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                <h2 className="text-xl font-bold text-gray-900">
                    তথ্য
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    তোমার অ্যাকাউন্টের নাম এখান থেকে পরিবর্তন করতে পারো।
                </p>

                <form onSubmit={handleSave} className="mt-6 max-w-xl">
                    <label
                        htmlFor="profile-name"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        নাম
                    </label>

                    <input
                        id="profile-name"
                        type="text"
                        autoComplete="name"
                        maxLength={100}
                        required
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError("");
                            setSuccess("");
                        }}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        placeholder="তোমার নাম লিখো"
                    />

                    {error && (
                        <p
                            role="alert"
                            className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
                        >
                            {error}
                        </p>
                    )}

                    {success && (
                        <p
                            role="status"
                            className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700"
                        >
                            {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={saving || signingOut}
                        className="mt-5 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {saving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
                    </button>
                </form>
            </section>
        </div>
    );
}
