import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/client";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mochi 🍵 Your AI Partner ✨",
  description: "Matcha × Coffee × Cream × Caramel aesthetic website builder.",
  icons: {
    icon: "/mochi-drink.png",
    shortcut: "/mochi-fly.png",
    apple: "/mochi-sleep.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#465F78",
          colorBackground: "#F7F2E1",
          colorText: "#465F78",
          colorInputBackground: "#FFF6E8",
          borderRadius: "0px",
          spacingUnit: "10px",
        },
        layout: {
          socialButtonsPlacement: "bottom",
          logoPlacement: "inside",
          logoImageUrl: "/mochi-drink.png",
          shimmer: true,
          helpPageUrl: "",
          unsafe_disableDevelopmentModeWarnings: true,
        },
        elements: {
          card: `
            bg-[#F7F2E1]
            border border-[#DCE3C2]
            shadow-xl
            p-8
            rounded-none
            w-full
            max-w-md
          `,
          logoImage: "w-40 h-40 mx-auto object-contain",
          formFieldInput: `
            bg-[#FFF6E8]
            border border-[#DCE3C2]
            rounded-none
            px-4 py-3
            text-[#465F78]
          `,
          formButtonPrimary: `
            bg-[#D9A76A]
            text-[#3A2F26]
            rounded-none
            py-3
            font-semibold
            hover:bg-[#C38E4A]
          `,
          userButtonPopoverCard: `
            bg-[#F7F2E1]
            border border-[#DCE3C2]
            rounded-none
            shadow-lg
          `,
        },
      }}
    >
      <TRPCReactProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <ThemeProvider attribute="class" defaultTheme="light">
              <Toaster />

           {children}

               
             

            </ThemeProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
