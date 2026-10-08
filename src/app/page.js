export default function HomePage() {
  return (
    <main className="container py-10">
      <section className="card shadow-soft p-8 text-center">
        <p className="text-sm font-semibold text-green-700">
          বাজার দর
        </p>

        <h1 className="mt-2 text-3xl font-black text-slate-900">
          আপনার বাজারের দাম এক নজরে
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
          চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ
          প্রয়োজনীয় পণ্যের বর্তমান বাজারদর সহজে
          দেখুন।
        </p>

        <a
          href="#সব-পণ্য"
          className="btn btn-primary mt-6"
        >
          সব পণ্য দেখুন
        </a>
      </section>

      <section
        id="সব-পণ্য"
        className="mt-10"
      >
        <div className="mb-5">
          <h2 className="section-title">
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            শীঘ্রই এখানে সব পণ্যের বর্তমান দাম
            দেখা যাবে।
          </p>
        </div>

        <div className="card p-8 text-center text-sm text-slate-500">
          Product data loading...
        </div>
      </section>
    </main>
  );
}