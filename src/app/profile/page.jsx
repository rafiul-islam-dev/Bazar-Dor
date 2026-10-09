
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileForm from "./ProfileForm";

export const instant = false;

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in?callbackURL=%2Fprofile");
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-4xl">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-800"
                >
                    <span aria-hidden="true">←</span>
                    বাজার দর
                </Link>

                <header className="mt-6">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        আমার প্রোফাইল
                    </h1>

                    <p className="mt-2 text-sm text-gray-600">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
                    </p>
                </header>

                <ProfileForm user={session.user} />
            </div>
        </main>
    );
}
