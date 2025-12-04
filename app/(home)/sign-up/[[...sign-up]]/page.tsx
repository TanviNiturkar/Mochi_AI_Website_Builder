"use client";

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <SignUp
        appearance={{
          elements: {
            card: `
              bg-[#F7F2E1]
              border border-[#DCE3C2]
              shadow-xl
              p-10
              rounded-none
              max-w-md
              w-full
            `,

            formButtonPrimary: `
              bg-[#D9A76A]
              text-[#3A2F26]
              rounded-none
              py-3
              font-semibold
              hover:bg-[#C38E4A]
            `,

            formFieldInput: `
              bg-[#FFF6E8]
              border border-[#DCE3C2]
              rounded-none
              px-4 py-3
              text-[#465F78]
            `,

            headerTitle: "text-[#465F78] text-2xl font-bold",
            headerSubtitle: "text-[#6A7E6D] mb-4",
          },
        }}
      />
    </div>
  );
}
