"use client";

import { useState, useEffect } from "react";

export const TypingText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="text-denim font-medium text-sm tracking-wide">
      {displayed}
    </span>
  );
};
