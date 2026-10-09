
"use client";

import { useSession, signOut } from "@/lib/auth-client";

export default function SessionTestPage() {
  const { data: session, isPending, error } = useSession();

  if (isPending) {
    return <main className="p-8">Session যাচাই হচ্ছে...</main>;
  }

  if (error) {
    return (
      <main className="p-8 text-red-600">
        Session যাচাই করতে সমস্যা হয়েছে।
      </main>
    );
  }

  if (!session) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">তুমি লগইন করা নেই</h1>
        <a className="mt-4 inline-block text-green-700 underline" href="/sign-in">
          Sign In করো
        </a>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-bold text-green-700">
        Session Active!
      </h1>

      <p className="mt-4">তুমি লগইন করা আছ।</p>
      <p className="mt-2">নাম: {session.user.name}</p>
      <p className="mt-2">ইমেইল: {session.user.email}</p>

      <button
        onClick={() => signOut()}
        className="mt-6 rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
      >
        Sign Out
      </button>
    </main>
  );
}
