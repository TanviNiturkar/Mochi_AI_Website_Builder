// "use client";

// import { Button } from "@/components/ui/button";
// import { useScroll } from "@/hooks/use-scroll";
// import { cn } from "@/lib/utils";
// import { UserControl } from "@/modules/projects/ui/components/ui/user-control";
// import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";

// export const Navbar = () => {
//   const isScrolled = useScroll();

//   return (
//     <nav
//       className={cn(
//         `
//         px-4 py-3 fixed top-0 left-0 right-0 z-50 
//         transition-all duration-300 
//        bg:[#DCEEC2]

//         `,
//         isScrolled &&
//         `
//         border-b border-[rgba(90,110,80,0.30)]
//         backdrop-blur-lg
//         opacity-[0.97]

//         drop-shadow-[0_6px_10px_rgba(90,110,80,0.25)]  /* works perfectly in v4 */
//         `
//       )}
//     >
//       <div className="max-w-5xl mx-auto w-full flex justify-between items-center">

//         {/* LOGO */}
//         <Link href="/" className="flex items-center gap-2">
//           <Image
//             src="/mochi-drink.png"
//             alt="Mochi"
//             width={48}
//             height={40}
//             className="object-contain"
//           />
//           <span className="font-semibold text-lg text-denim">Mochi</span>
//         </Link>

//         {/* AUTH */}
//         <SignedOut>
//           <div className="flex gap-2">
//             <SignUpButton>
//               <Button variant="outline" size="sm">Sign Up</Button>
//             </SignUpButton>

//             <SignInButton>
//               <Button size="sm">Sign In</Button>
//             </SignInButton>
//           </div>
//         </SignedOut>

//         <SignedIn>
//           <UserControl showName />
//         </SignedIn>

//       </div>
//     </nav>
//   );
// };


"use client";

import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { UserControl } from "@/modules/projects/ui/components/ui/user-control";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const isScrolled = useScroll();

  return (
    <nav
      className={cn(
        `
        px-4 py-3 fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 
        bg:[#DCEEC2]       /* FIXED COLOR */
        overflow-hidden    /* PREVENT HORIZONTAL SCROLL */
        `,
        isScrolled &&
        `
        border-b border-[rgba(90,110,80,0.30)]
        backdrop-blur-lg
        opacity-[0.97]
        drop-shadow-[0_6px_10px_rgba(90,110,80,0.25)]
        `
      )}
    >
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/mochi-drink.png"
            alt="Mochi"
            width={40}
            height={40}
            className="object-contain"
          />

          {/* NAME — hidden on mobile */}
          <span className="font-semibold text-lg text-denim hidden sm:inline">
            Mochi
          </span>
        </Link>

        {/* AUTH */}
        <SignedOut>
          <div className="flex gap-2">
            <SignUpButton>
              <Button variant="outline" size="sm">Sign Up</Button>
            </SignUpButton>

            <SignInButton>
              <Button size="sm">Sign In</Button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          {/* User avatar + name — but hide name on mobile */}
          <UserControl showName={true} />
        </SignedIn>
      </div>
    </nav>
  );
};
