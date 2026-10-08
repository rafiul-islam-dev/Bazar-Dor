"use client";

import { useEffect, useState } from "react";

export default function BanglaDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    setDate(formattedDate);
  }, []);

  if (!date) {
    return (
      <p className="mt-1 h-3 text-[9px] leading-none text-slate-400 sm:text-[10px]">
        &nbsp;
      </p>
    );
  }

  return (
    <p className="mt-1 text-[9px] leading-none text-slate-400 sm:text-[10px]">
      {date}
    </p>
  );
}