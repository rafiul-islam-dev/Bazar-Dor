export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="container flex flex-col justify-between gap-3 py-5 text-xs text-slate-500 sm:flex-row sm:items-center">
        <p>
          <span className="font-bold text-slate-700">
            বাজার দর
          </span>{" "}
          — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে
          পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}