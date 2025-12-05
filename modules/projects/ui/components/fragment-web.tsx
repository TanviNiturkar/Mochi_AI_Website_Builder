// 'use client';

// import { useState } from "react";
// import { Fragment } from "@/lib/generated/prisma";
// import { Button } from "@/components/ui/button";
// import { RefreshCcwIcon, ExternalLinkIcon } from "lucide-react";
// import { Hint } from "./ui/hint";

// interface Props {
//   data: Fragment;
// }

// export function FragmentWeb({ data }: Props) {
//   const [copied, setCopied] = useState(false);
//   const [fragmentKey, setFragmentKey] = useState(0);

//   const onRefresh = () => setFragmentKey(prev => prev + 1);

//   const handleCopy = () => {
//     if (!data.sandboxUrl) return;
//     navigator.clipboard.writeText(data.sandboxUrl);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   if (!data.sandboxUrl) return <p>Waiting for AI to generate website...</p>;

//   // --- Force HTTPS here ---
//   const secureUrl = data.sandboxUrl.replace(/^http:\/\//i, "https://");

//   return (
//     <div className="flex flex-col w-full h-full">
//       <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
//         <Hint text="Refresh" side="bottom" align="start">
//           <Button size="sm" variant="outline" onClick={onRefresh}>
//             <RefreshCcwIcon />
//           </Button>
//         </Hint>

//         <Hint text="Click to copy" side="bottom">
//           <Button
//             size="sm"
//             variant="outline"
//             onClick={handleCopy}
//             className="flex-1 justify-start text-start font-normal"
//             disabled={!data.sandboxUrl || copied}
//           >
//             <span className="truncate">{data.sandboxUrl}</span>
//           </Button>
//         </Hint>

//         <Hint text="Open in a new tab" side="bottom" align="start">
//           <Button
//             size="sm"
//             disabled={!data.sandboxUrl}
//             variant="outline"
//             onClick={() => window.open(secureUrl, "_blank")}
//           >
//             <ExternalLinkIcon />
//           </Button>
//         </Hint>
//       </div>

//       <iframe
//         key={fragmentKey}
//         className="h-full w-full"
//         sandbox="allow-forms allow-scripts allow-same-origin"
//         loading="lazy"
//         src={secureUrl} // <-- Use HTTPS here
//       />
//     </div>
//   );
// }


// 'use client';

// import { useState } from "react";
// import { Fragment } from "@/lib/generated/prisma";
// import { Button } from "@/components/ui/button";
// import { RefreshCcwIcon, ExternalLinkIcon } from "lucide-react";
// import { Hint } from "./ui/hint";

// interface Props {
//   data: Fragment;
// }

// export function FragmentWeb({ data }: Props) {
//   const [copied, setCopied] = useState(false);
//   const [fragmentKey, setFragmentKey] = useState(0);

//   const onRefresh = () => setFragmentKey(prev => prev + 1);

//   const handleCopy = () => {
//     if (!data.sandboxUrl) return;
//     navigator.clipboard.writeText(data.sandboxUrl);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   if (!data.sandboxUrl) return <p>Waiting for AI to generate website...</p>;

//   const secureUrl = data.sandboxUrl.replace(/^http:\/\//i, "https://");

//   return (
//     <div className="flex flex-col w-full h-full overflow-hidden">

//       {/* Top bar */}
//       <div className="p-2 border-b bg-sidebar flex items-center gap-x-2 w-full overflow-hidden">

//         <Hint text="Refresh" side="bottom" align="start">
//           <Button size="sm" variant="outline" onClick={onRefresh}>
//             <RefreshCcwIcon />
//           </Button>
//         </Hint>

//         <Hint text="Click to copy" side="bottom">
//           <Button
//             size="sm"
//             variant="outline"
//             onClick={handleCopy}
//             className="flex-1 justify-start text-start font-normal truncate"
//             disabled={!data.sandboxUrl || copied}
//           >
//             <span className="truncate">{secureUrl}</span>
//           </Button>
//         </Hint>

//         <Hint text="Open in a new tab" side="bottom" align="start">
//           <Button
//             size="sm"
//             disabled={!data.sandboxUrl}
//             variant="outline"
//             onClick={() => window.open(secureUrl, "_blank")}
//           >
//             <ExternalLinkIcon />
//           </Button>
//         </Hint>
//       </div>

//       {/* IFRAME WRAPPER – RESPONSIVE FIX */}
//       <div
//         className="
//           w-full h-full 
//           overflow-hidden 
//           flex justify-center 
//           bg-input
//         "
//       >
//         <div
//           className="
//             w-full h-full 
//             max-w-full 
//             overflow-hidden 
//           "
//         >
//           <iframe
//             key={fragmentKey}
//             className="
//               w-full h-full 
//               overflow-hidden 
//               max-w-full 
//               block 
//               border-0
//             "
//             sandbox="allow-forms allow-scripts allow-same-origin"
//             loading="lazy"
//             src={secureUrl}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client';

// import { useState } from "react";
// import { Fragment } from "@/lib/generated/prisma";
// import { Button } from "@/components/ui/button";
// import { RefreshCcwIcon, ExternalLinkIcon } from "lucide-react";
// import { Hint } from "./ui/hint";

// interface Props {
//   data: Fragment;
// }

// export function FragmentWeb({ data }: Props) {
//   const [copied, setCopied] = useState(false);
//   const [fragmentKey, setFragmentKey] = useState(0);

//   const onRefresh = () => setFragmentKey(prev => prev + 1);

//   const handleCopy = () => {
//     if (!data.sandboxUrl) return;
//     navigator.clipboard.writeText(data.sandboxUrl);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   if (!data.sandboxUrl) return <p>Waiting for AI to generate website...</p>;

//   const secureUrl = data.sandboxUrl.replace(/^http:\/\//i, "https://");

//   return (
//     <div className="flex flex-col w-full h-full overflow-hidden bg-input">

//       {/* Top header */}
//       <div className="p-2 border-b bg-sidebar flex items-center gap-x-2 w-full overflow-hidden">

//         <Hint text="Refresh" side="bottom" align="start">
//           <Button size="sm" variant="outline" onClick={onRefresh}>
//             <RefreshCcwIcon />
//           </Button>
//         </Hint>

//         <Hint text="Click to copy" side="bottom">
//           <Button
//             size="sm"
//             variant="outline"
//             onClick={handleCopy}
//             className="flex-1 justify-start text-start font-normal truncate"
//             disabled={!data.sandboxUrl || copied}
//           >
//             <span className="truncate">{secureUrl}</span>
//           </Button>
//         </Hint>

//         <Hint text="Open in new tab" side="bottom" align="start">
//           <Button
//             size="sm"
//             disabled={!data.sandboxUrl}
//             variant="outline"
//             onClick={() => window.open(secureUrl, "_blank")}
//           >
//             <ExternalLinkIcon />
//           </Button>
//         </Hint>
//       </div>

//       {/* Full-height IFRAME */}
//       <div className="w-full h-full overflow-hidden bg-input flex justify-center">
//         <iframe
//           key={fragmentKey}
//           className="w-full h-full max-w-full block border-0 overflow-hidden"
//           sandbox="allow-forms allow-scripts allow-same-origin"
//           loading="lazy"
//           src={secureUrl}
//         />
//       </div>

//     </div>
//   );
// }



'use client';

import { useState } from "react";
import { Fragment } from "@/lib/generated/prisma";
import { Button } from "@/components/ui/button";
import { RefreshCcwIcon, ExternalLinkIcon } from "lucide-react";
import { Hint } from "./ui/hint";

interface Props {
  data: Fragment;
}

export function FragmentWeb({ data }: Props) {
  const [copied, setCopied] = useState(false);
  const [fragmentKey, setFragmentKey] = useState(0);

  const onRefresh = () => setFragmentKey(prev => prev + 1);

  const handleCopy = () => {
    if (!data.sandboxUrl) return;
    navigator.clipboard.writeText(data.sandboxUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data.sandboxUrl)
    return <p>Waiting for AI to generate website...</p>;

  const secureUrl = data.sandboxUrl.replace(/^http:\/\//i, "https://");

  return (
    <div className="flex flex-col w-full bg-input overflow-hidden">

      {/* HEADER BAR */}
      <div className="p-2 border-b bg-sidebar flex items-center gap-x-2 w-full">

        <Hint text="Refresh" side="bottom" align="start">
          <Button size="sm" variant="outline" onClick={onRefresh}>
            <RefreshCcwIcon />
          </Button>
        </Hint>

        <Hint text="Click to copy" side="bottom">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="flex-1 justify-start text-start font-normal truncate"
            disabled={!data.sandboxUrl || copied}
          >
            <span className="truncate">{secureUrl}</span>
          </Button>
        </Hint>

        <Hint text="Open in new tab" side="bottom" align="start">
          <Button
            size="sm"
            variant="outline"
            disabled={!data.sandboxUrl}
            onClick={() => window.open(secureUrl, "_blank")}
          >
            <ExternalLinkIcon />
          </Button>
        </Hint>
      </div>

      {/* WEBSITE PREVIEW */}
     {/* WEBSITE PREVIEW */}
<div className="w-full overflow-hidden bg-input flex justify-center">
  <iframe
    key={fragmentKey}
    className="w-full h-[500px] block border-0 rounded-md shadow"
    sandbox="allow-forms allow-scripts allow-same-origin"
    loading="lazy"
    src={secureUrl}
  />
</div>


    </div>
  );
}
