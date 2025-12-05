"use client";

import { Navbar } from "@/modules/home/components/navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">

      {/* 🌿 FIXED DOT BACKGROUND — SAFE FOR MOBILE */}
      <div className="fixed inset-0 -z-10 w-screen h-screen pointer-events-none">
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(rgba(255,255,255,0.35)_1.2px,transparent_1.2px)]
            sm:bg-[radial-gradient(rgba(255,255,255,0.28)_1.4px,transparent_1.4px)]
            [background-size:28px_28px]
            sm:[background-size:32px_32px]
            bg-background
          "
        />
      </div>

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full px-4 pt-6 pb-20">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="w-full text-center py-6 bg-sand text-denim border-t border-border">
        <p className="text-sm">Made with 💚 Matcha & Mochi</p>
        <p className="text-xs opacity-70 mt-1">© 2025 Mochi Website Builder</p>
      </footer>
    </div>
  );
};

export default Layout;
