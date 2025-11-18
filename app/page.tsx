// app/page.tsx (client)
"use client";
import React, { useState } from "react";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("");
  const [link, setLink] = useState("");

  async function handleGenerate() {
    setStatus("Generating...");
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, slug }),
    });
    const data = await res.json();
    if (!data.ok) {
      setStatus("Error: " + (data.error || "unknown"));
      return;
    }
    setStatus("Generated. Waiting for Next.js to reload...");
    // The generated page will appear at /generated/<slug>
    const s = slug || prompt.split(" ").slice(0,3).join("-").toLowerCase();
    setLink(`/generated/${s}`);
    setTimeout(()=> setStatus("Ready — open " + `/generated/${s}`), 1500);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">AI Website Builder — Dynamic</h1>
      <input value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="e.g. create a calculator UI with buttons and display" className="border p-2 w-full my-2" />
      <input value={slug} onChange={(e)=>setSlug(e.target.value)} placeholder="slug (optional) e.g. calculator" className="border p-2 w-full my-2" />
      <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded">Generate</button>
      <p className="mt-3 text-sm">{status}</p>
      {link && <a className="text-blue-600" href={link}>{link}</a>}
    </div>
  );
}
