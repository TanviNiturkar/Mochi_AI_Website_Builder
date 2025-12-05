// "use client";

// import { useCurrentTheme } from "@/hooks/use-current-theme";
// import { UserButton } from "@clerk/nextjs"
// import { dark } from "@clerk/themes";
// interface Props {
//     showName? : boolean ;
// }

// export const UserControl = ({showName = false} : Props) =>{
//     const currentTheme = useCurrentTheme();
//     return (
//         <UserButton
//         showName={showName}
//         appearance={
//             {
//                 elements: {
//                     userButtonBox: "rounded-md!",
//                     userButtonAvatarBox: "rounded-md! size-8!",
//                     userButtonTrigger : "rounded-md!",
//                 },
//                 baseTheme: currentTheme === "dark" ? dark : undefined,
//             }
//         }
//         />   

//         )}

"use client";

import { useCurrentTheme } from "@/hooks/use-current-theme";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

interface Props {
  showName?: boolean;
}

export const UserControl = ({ showName = false }: Props) => {
  const currentTheme = useCurrentTheme();

  return (
    <UserButton
      appearance={{
        elements: {
          userButtonBox: "rounded-md!",
          userButtonAvatarBox: "rounded-md! size-8!",
          userButtonTrigger: "rounded-md!",

          // HIDE NAME ON MOBILE
          userButtonOuterIdentifier: "hidden sm:inline",

          // prevent overflow issues
          rootBox: "max-w-full overflow-hidden",
        },
        baseTheme: currentTheme === "dark" ? dark : undefined,
      }}
      showName={showName}
    />
  );
};
