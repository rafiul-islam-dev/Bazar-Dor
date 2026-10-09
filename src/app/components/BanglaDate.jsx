
"use client";

import { useEffect, useState } from "react";

export default function BanglaDate() {
  const [dateText, setDateText] = useState("");

  useEffect(() => {
    const now = new Date();

    const date = new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);

    const day = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
    }).format(now);

    setDateText(`${day}, ${date}`);
  }, []);

  if (!dateText) return null;

  return (
    <p className="text-[11px] text-gray-600">
      {dateText}
    </p>
  );
}
