"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TheMachinePage() {
  const router = useRouter();

  useEffect(() => {
    fetch("/templates/the-machine.json")
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem(
          "wolfsight-diagram",
          JSON.stringify(data)
        );
        router.push("/");
      })
      .catch(() => router.push("/templates"));
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🐺</div>
        <p className="text-[#F97316] font-bold">Loading The Machine...</p>
      </div>
    </div>
  );
}
