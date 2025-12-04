"use client";
import { Navbar } from "@/modules/home/components/navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* NAVBAR */}
      <Navbar />

      {/* BACKGROUND */}
      <div
        className="
          absolute inset-0 -z-10 w-full h-full
          bg-background
          dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)]
          bg-[radial-gradient(#dadde2_1px,transparent_1px)]
          [background-size:16px_16px]
        "
      />

      {/* MAIN CONTENT — FORCE FULL HEIGHT EVEN IF EMPTY */}
      <div className="flex-1 flex flex-col justify-start px-4">
        <div className="flex-1 flex flex-col justify-center">
          {children}
        </div>
      </div>

      {/* FOOTER — ALWAYS AT BOTTOM */}
      <footer className="w-full text-center py-6 bg-sand text-denim border-t border-border">
        <p className="text-sm">Made with 💚 Matcha & Mochi</p>
        <p className="text-xs opacity-70 mt-1">© 2025 Mochi Website Builder</p>
      </footer>
    </div>
  );
};

export default Layout;
