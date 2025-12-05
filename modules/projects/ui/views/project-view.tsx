// // "use client";
// // import {
// //   ResizableHandle,
// //   ResizablePanel,
// //   ResizablePanelGroup,
// // } from "@/components/ui/resizable";
// // import { useTRPC } from "@/trpc/client";
// // import { useSuspenseQuery } from "@tanstack/react-query";
// // import MessagesContainer from "../components/messages-container";
// // import { Suspense, useState } from "react";
// // import { Fragment } from "@/lib/generated/prisma";
// // import { ProjectHeader } from "../components/project-header";
// // import { FragmentWeb } from "../components/fragment-web";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { CodeIcon, CrownIcon, EyeIcon } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import Link from "next/link";
// // import { CodeView } from "../components/code-view";

// // import { UserControl } from "../components/ui/user-control";
// // import { useAuth } from "@clerk/nextjs";
// // import { FileExplorer } from "../components/ui/file-explorer";
// // import { ErrorBoundary } from "react-error-boundary";

// // interface Props {
// //   projectId: string;
// // }
// // export const ProjectView = ({ projectId }: Props) => {
// //    const {has} = useAuth();
// //     const hasProAccess= has?.({plan: "pro"}) 
// //   //const trpc = useTRPC();
// //   //   const { data: project } = useSuspenseQuery(
// //   //     trpc.projects.getOne.queryOptions({
// //   //       id: projectId,
// //   //     })
// //   //   );

// //   const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
// //   const [tabState, setTabState] = useState<"preview" | "code">("preview");
// //   const isFreeTier = has?.({plan: "free_user"})

// //   return (
// //     <div className="h-screen">
// //       <ResizablePanelGroup direction="horizontal">
// //         <ResizablePanel
// //           defaultSize={35}
// //           minSize={20}
// //           className="flex flex-col min-h-0"
// //         >
          
// //           <Suspense fallback={<p>Loading Project...</p>}>
// //             <ProjectHeader projectId={projectId} />
// //           </Suspense>
          
          
// //           <Suspense fallback={<p>Loading Messages...</p>}>
// //             <MessagesContainer
// //               projectId={projectId}
// //               activeFragment={activeFragment}
// //               setActiveFragment={setActiveFragment}
// //             />{" "}
// //           </Suspense>
          
// //         </ResizablePanel>
// //         <ResizableHandle className="hover:bg-primary transition-colors" ></ResizableHandle>
// //         <ResizablePanel defaultSize={65} minSize={50}>
// //           <Tabs
// //             className="h-full gap-y-8"
// //             defaultValue="preview"
// //             value={tabState}
// //             onValueChange={(value) => setTabState(value as "preview" | "code")}

// //           >
// //             <div className="w-full flex items-center p-2 border-b gap-x-2">
// //               <TabsList className="h-8 p-0 border rounded-md">
// //                 <TabsTrigger value="preview" className="rounded-md">
// //                   <EyeIcon />
// //                   <span>Demo</span>
// //                 </TabsTrigger>
// //                 <TabsTrigger value="code" className="rounded-md">
// //                   <CodeIcon />
// //                   <span>Code</span>
// //                 </TabsTrigger>
// //               </TabsList>
// //               <div className="ml-auto flex items-center gap-x-2">
// //                 {!hasProAccess && (
// //                 <Button asChild size="sm" variant="tertiary">
// //                   <Link href="/pricing">
// //                     <CrownIcon /> Upgrade
// //                   </Link>
// //                 </Button>
// //                 )}
// //                 <UserControl />
// //               </div>
// //             </div>
// //             <TabsContent value="preview">
// //               {" "}
// //               {!!activeFragment && <FragmentWeb data={activeFragment} />}{" "}
// //             </TabsContent>
// //             <TabsContent value="code" className="min-h-0">
// //               {!!activeFragment?.files && (
// //                 <FileExplorer files={activeFragment.files as { [path: string]:string }}/>
// //               )}
// //             </TabsContent>
// //           </Tabs>
// //         </ResizablePanel>
// //       </ResizablePanelGroup>
// //     </div>
// //   );
// // };

// 'use client';

// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import { Suspense, useEffect, useState } from "react";
// import MessagesContainer from "../components/messages-container";
// import { FragmentWeb } from "../components/fragment-web";
// import { ProjectHeader } from "../components/project-header";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CodeIcon, EyeIcon, CrownIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useAuth } from "@clerk/nextjs";
// import { Fragment } from "@/lib/generated/prisma";
// import { UserControl } from "../components/ui/user-control";
// import { FileExplorer } from "../components/ui/file-explorer";

// interface Props {
//   projectId: string;
// }

// export const ProjectView = ({ projectId }: Props) => {
//   const { has } = useAuth();
//   const hasProAccess = has?.({ plan: "pro" });

//   const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
//   const [tabState, setTabState] = useState<"preview" | "code">("preview");

//   // AUTO SELECT FRAGMENT
//   useEffect(() => {
//     const checkLatestFragment = async () => {
//       const interval = setInterval(() => {
//         const iframeFragment = document.querySelector<HTMLElement>(
//           "[data-sandbox-url]"
//         );
//         if (iframeFragment && !activeFragment) {
//           setActiveFragment(
//             // @ts-ignore
//             iframeFragment.dataset.fragment as Fragment
//           );
//           clearInterval(interval);
//         }
//       }, 500);
//     };
//     checkLatestFragment();
//   }, [activeFragment]);

//   return (
//     <div className="h-screen">
//       <ResizablePanelGroup direction="horizontal">

//         {/* LEFT SIDE */}
//         <ResizablePanel
//           defaultSize={35}
//           minSize={20}
//           className="flex flex-col min-h-0"
//         >
//           <Suspense fallback={<p>Loading Project...</p>}>
//             <ProjectHeader projectId={projectId} />
//           </Suspense>

//           <Suspense fallback={<p>Loading Messages...</p>}>
//             <MessagesContainer
//               projectId={projectId}
//               activeFragment={activeFragment}
//               setActiveFragment={setActiveFragment}
//             />
//           </Suspense>
//         </ResizablePanel>

//         <ResizableHandle className="hover:bg-primary transition-colors" />

//         {/* RIGHT SIDE — FIXED WITH bg-input */}
//         <ResizablePanel
//           defaultSize={65}
//           minSize={50}
//           className="bg-input"
//         >
//           <Tabs
//             className="h-full gap-y-8"
//             defaultValue="preview"
//             value={tabState}
//             onValueChange={(value) => setTabState(value as "preview" | "code")}
//           >

//             {/* TABS HEADER */}
//             <div className="w-full flex items-center p-2 gap-x-2 bg-card border-b border-muted">

//               <TabsList className="h-8 p-0 border bg-muted/40 rounded-none shadow-sm">
//                 <TabsTrigger
//                   value="preview"
//                   className="rounded-none px-3 py-1.5 data-[state=active]:bg-card data-[state=active]:shadow-inner"
//                 >
//                   <EyeIcon className="size-4" />
//                   <span>Demo</span>
//                 </TabsTrigger>

//                 <TabsTrigger
//                   value="code"
//                   className="rounded-none px-3 py-1.5 data-[state=active]:bg-card data-[state=active]:shadow-inner"
//                 >
//                   <CodeIcon className="size-4" />
//                   <span>Code</span>
//                 </TabsTrigger>
//               </TabsList>

//               <div className="ml-auto flex items-center gap-x-2">
//                 {!hasProAccess && (
//                   <Button asChild size="sm" variant="premium">
//                     <Link href="/pricing">
//                       <CrownIcon /> Upgrade
//                     </Link>
//                   </Button>
//                 )}
//                 <UserControl />
//               </div>
//             </div>

//             {/* PREVIEW */}
//             <TabsContent value="preview">
//               {!!activeFragment && <FragmentWeb data={activeFragment} />}
//             </TabsContent>

//             {/* CODE */}
//             <TabsContent value="code" className="min-h-0">
//               {!!activeFragment?.files && (
//                 <FileExplorer
//                   files={activeFragment.files as { [path: string]: string }}
//                 />
//               )}
//             </TabsContent>

//           </Tabs>
//         </ResizablePanel>
//       </ResizablePanelGroup>
//     </div>
//   );
// };



// 'use client';

// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import { Suspense, useEffect, useState } from "react";
// import MessagesContainer from "../components/messages-container";
// import { FragmentWeb } from "../components/fragment-web";
// import { ProjectHeader } from "../components/project-header";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CodeIcon, EyeIcon, CrownIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useAuth } from "@clerk/nextjs";
// import { Fragment } from "@/lib/generated/prisma";
// import { UserControl } from "../components/ui/user-control";
// import { FileExplorer } from "../components/ui/file-explorer";

// interface Props {
//   projectId: string;
// }

// export const ProjectView = ({ projectId }: Props) => {
//   const { has } = useAuth();
//   const hasProAccess = has?.({ plan: "pro" });

//   const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
//   const [tabState, setTabState] = useState<"preview" | "code">("preview");

//   // Auto-select fragment when sandbox loads
//   useEffect(() => {
//     const checkLatest = setInterval(() => {
//       const iframe = document.querySelector<HTMLElement>("[data-sandbox-url]");
//       if (iframe && !activeFragment) {
//         setActiveFragment(
//           // @ts-ignore
//           iframe.dataset.fragment as Fragment
//         );
//         clearInterval(checkLatest);
//       }
//     }, 500);
//   }, [activeFragment]);

//   return (
//     <div className="h-screen">
//       <ResizablePanelGroup direction="horizontal">

//         {/* LEFT SIDE */}
//         <ResizablePanel defaultSize={35} minSize={20} className="flex flex-col min-h-0">
//           <Suspense fallback={<p>Loading Project...</p>}>
//             <ProjectHeader projectId={projectId} />
//           </Suspense>

//           <Suspense fallback={<p>Loading Messages...</p>}>
//             <MessagesContainer
//               projectId={projectId}
//               activeFragment={activeFragment}
//               setActiveFragment={setActiveFragment}
//             />
//           </Suspense>
//         </ResizablePanel>

//         <ResizableHandle className="hover:bg-primary transition-colors" />

//         {/* RIGHT SIDE */}
//         <ResizablePanel defaultSize={65} minSize={50} className="bg-input">
//           <Tabs
//             className="h-full"
//             defaultValue="preview"
//             value={tabState}
//             onValueChange={(v) => setTabState(v as "preview" | "code")}
//           >

//             {/* NAVBAR */}
//             <div className="w-full flex items-center p-2 gap-x-2 bg-card border-b border-muted">

//               <TabsList className="h-8 p-0 border bg-input rounded-none shadow-sm">
                
//                 <TabsTrigger
//                   value="preview"
//                   className="
//                     rounded-none px-3 py-1.5
//                     data-[state=active]:bg-primary
//                     data-[state=active]:text-primary-foreground
//                     data-[state=inactive]:bg-input
//                   "
//                 >
//                   <EyeIcon className="size-4" />
//                   Demo
//                 </TabsTrigger>

//                 <TabsTrigger
//                   value="code"
//                   className="
//                     rounded-none px-3 py-1.5
//                     data-[state=active]:bg-primary
//                     data-[state=active]:text-primary-foreground
//                     data-[state=inactive]:bg-input
//                   "
//                 >
//                   <CodeIcon className="size-4" />
//                   Code
//                 </TabsTrigger>

//               </TabsList>

//               <div className="ml-auto flex items-center gap-x-2">
//                 {!hasProAccess && (
//                   <Button asChild size="sm" variant="premium">
//                     <Link href="/pricing">
//                       <CrownIcon /> Upgrade
//                     </Link>
//                   </Button>
//                 )}
//                 <UserControl />
//               </div>
//             </div>

//             {/* PREVIEW */}
//             <TabsContent value="preview">
//               {!!activeFragment && <FragmentWeb data={activeFragment} />}
//             </TabsContent>

//             {/* CODE */}
//             <TabsContent value="code" className="min-h-0">
//               {!!activeFragment?.files && (
//                 <FileExplorer files={activeFragment.files as { [path: string]: string }} />
//               )}
//             </TabsContent>

//           </Tabs>
//         </ResizablePanel>

//       </ResizablePanelGroup>
//     </div>
//   );
// };

// "use client";

// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import { Suspense, useEffect, useState } from "react";
// import MessagesContainer from "../components/messages-container";
// import { FragmentWeb } from "../components/fragment-web";
// import { ProjectHeader } from "../components/project-header";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CodeIcon, EyeIcon, CrownIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useAuth } from "@clerk/nextjs";
// import { Fragment } from "@/lib/generated/prisma";
// import { UserControl } from "../components/ui/user-control";
// import { FileExplorer } from "../components/ui/file-explorer";

// interface Props {
//   projectId: string;
// }

// export const ProjectView = ({ projectId }: Props) => {
//   const { has } = useAuth();
//   const hasProAccess = has?.({ plan: "pro" });

//   const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);

//   const [tabState, setTabState] = useState<"messages" | "preview" | "code">(
//     "messages"
//   );

//   // Detect active fragment from sandbox
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const iframe = document.querySelector<HTMLElement>("[data-sandbox-url]");
//       if (iframe && !activeFragment) {
//         setActiveFragment(
//           // @ts-ignore
//           iframe.dataset.fragment as Fragment
//         );
//         clearInterval(timer);
//       }
//     }, 500);
//   }, [activeFragment]);

//   return (
//     <div className="h-screen w-full overflow-x-hidden bg-input">

//       {/* 🌸 Mobile Layout (Lovable Style) */}
//       <div className="md:hidden flex flex-col h-screen w-full overflow-hidden">

//         <Suspense fallback={<p>Loading...</p>}>
//           <ProjectHeader projectId={projectId} />
//         </Suspense>

//         {/* SCROLLABLE CONTENT */}
//         <div className="flex-1 overflow-y-auto overflow-x-hidden">

//           {tabState === "messages" && (
//             <Suspense fallback={<p>Loading Messages...</p>}>
//               <MessagesContainer
//                 projectId={projectId}
//                 activeFragment={activeFragment}
//                 setActiveFragment={setActiveFragment}
//               />
//             </Suspense>
//           )}

//           {tabState === "preview" && (
//             <div className="w-full overflow-x-hidden flex justify-center">
//               <div className="w-full max-w-[700px] overflow-hidden">
//                 {activeFragment && <FragmentWeb data={activeFragment} />}
//               </div>
//             </div>
//           )}

//           {tabState === "code" && (
//             <div className="w-full h-full p-2 overflow-x-hidden">
//               {!!activeFragment?.files && (
//                 <FileExplorer
//                   files={activeFragment.files as { [path: string]: string }}
//                 />
//               )}
//             </div>
//           )}

//         </div>

//         {/* Sticky Bottom Tabs */}
//         <div className="w-full bg-card border-t border-muted shadow-inner p-2 flex justify-around">

//           <button
//             onClick={() => setTabState("messages")}
//             className={`px-4 py-2 rounded-lg font-medium ${
//               tabState === "messages"
//                 ? "bg-primary text-primary-foreground"
//                 : "bg-input"
//             }`}
//           >
//             Chat
//           </button>

//           <button
//             onClick={() => setTabState("preview")}
//             className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
//               tabState === "preview"
//                 ? "bg-primary text-primary-foreground"
//                 : "bg-input"
//             }`}
//           >
//             <EyeIcon className="size-4" /> Demo
//           </button>

//           <button
//             onClick={() => setTabState("code")}
//             className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
//               tabState === "code"
//                 ? "bg-primary text-primary-foreground"
//                 : "bg-input"
//             }`}
//           >
//             <CodeIcon className="size-4" /> Code
//           </button>

//         </div>

//       </div>

//       {/* 🌸 Desktop Layout */}
//       <div className="hidden md:block h-screen w-full overflow-hidden">
//         <ResizablePanelGroup direction="horizontal">

//           {/* LEFT SIDE */}
//           <ResizablePanel
//             defaultSize={35}
//             minSize={20}
//             className="flex flex-col min-h-0"
//           >
//             <Suspense fallback={<p>Loading Project...</p>}>
//               <ProjectHeader projectId={projectId} />
//             </Suspense>

//             <Suspense fallback={<p>Loading Messages...</p>}>
//               <MessagesContainer
//                 projectId={projectId}
//                 activeFragment={activeFragment}
//                 setActiveFragment={setActiveFragment}
//               />
//             </Suspense>
//           </ResizablePanel>

//           <ResizableHandle className="hover:bg-primary transition-colors" />

//           {/* RIGHT SIDE */}
//           <ResizablePanel
//             defaultSize={65}
//             minSize={50}
//             className="bg-input overflow-x-hidden"
//           >
//             <Tabs
//               className="h-full"
//               defaultValue="preview"
//               value={tabState === "messages" ? "preview" : tabState}
//               onValueChange={(v) =>
//                 setTabState(v as "preview" | "code" | "messages")
//               }
//             >
//               <div className="w-full flex items-center p-2 gap-x-2 bg-card border-b border-muted">

//                 <TabsList className="h-8 p-0 border bg-input rounded-none shadow-sm">

//                   <TabsTrigger
//                     value="preview"
//                     className="
//                       rounded-none px-3 py-1.5
//                       data-[state=active]:bg-primary
//                       data-[state=active]:text-primary-foreground
//                     "
//                   >
//                     <EyeIcon className="size-4" />
//                     Demo
//                   </TabsTrigger>

//                   <TabsTrigger
//                     value="code"
//                     className="
//                       rounded-none px-3 py-1.5
//                       data-[state=active]:bg-primary
//                       data-[state=active]:text-primary-foreground
//                     "
//                   >
//                     <CodeIcon className="size-4" />
//                     Code
//                   </TabsTrigger>

//                 </TabsList>

//                 <div className="ml-auto flex items-center gap-x-2">
//                   {!hasProAccess && (
//                     <Button asChild size="sm" variant="premium">
//                       <Link href="/pricing">
//                         <CrownIcon /> Upgrade
//                       </Link>
//                     </Button>
//                   )}
//                   <UserControl />
//                 </div>

//               </div>

//               {/* PREVIEW */}
//               <TabsContent
//                 value="preview"
//                 className="w-full overflow-x-hidden flex justify-center"
//               >
//                 <div className="w-full max-w-[900px] overflow-hidden">
//                   {!!activeFragment && <FragmentWeb data={activeFragment} />}
//                 </div>
//               </TabsContent>

//               {/* CODE */}
//               <TabsContent value="code" className="min-h-0 overflow-x-hidden">
//                 {!!activeFragment?.files && (
//                   <FileExplorer
//                     files={activeFragment.files as { [path: string]: string }}
//                   />
//                 )}
//               </TabsContent>

//             </Tabs>
//           </ResizablePanel>

//         </ResizablePanelGroup>
//       </div>

//     </div>
//   );
// };
// "use client";

// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import { Suspense, useEffect, useState } from "react";
// import MessagesContainer from "../components/messages-container";
// import { FragmentWeb } from "../components/fragment-web";
// import { ProjectHeader } from "../components/project-header";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CodeIcon, EyeIcon, CrownIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useAuth } from "@clerk/nextjs";
// import { Fragment } from "@/lib/generated/prisma";
// import { UserControl } from "../components/ui/user-control";
// import { FileExplorer } from "../components/ui/file-explorer";
// import { FloatingInputMochi } from "@/components/ui/FloatingInputMochi";

// interface Props {
//   projectId: string;
// }

// export const ProjectView = ({ projectId }: Props) => {
//   const { has } = useAuth();
//   const hasProAccess = has?.({ plan: "pro" });

//   const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);

//   const [tabState, setTabState] = useState<"messages" | "preview" | "code">(
//     "messages"
//   );

//   // Detect active fragment from iframe
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const iframe = document.querySelector<HTMLElement>("[data-sandbox-url]");
//       if (iframe && !activeFragment) {
//         setActiveFragment(
//           // @ts-ignore
//           iframe.dataset.fragment as Fragment
//         );
//         clearInterval(timer);
//       }
//     }, 500);
//   }, [activeFragment]);


//   return (
    
//     <div className="h-screen w-full overflow-x-hidden bg-background">
//   <FloatingInputMochi
//             src="/retro-computer.png"
//             size={34}
//             className="-top-8 left-[410px]"
//           />
//           <FloatingInputMochi
//             src="/mochi-fly.png"
//             size={34}
//             className="-top-30 left-[310px]"
//           />
//           {/* 🌸 Mochi #2 — near Enter text */}
//           <FloatingInputMochi
//             src="/mochi-sleep.png"
//             size={45}
//             className="bottom-[55px] left-6"
//           />

//           {/* 🌸 Mochi-drink next to "Start a New Project" */}
// <FloatingInputMochi
//   src="/mochi-drink.png"
//   size={30}
//   className="-top-10 left-[210px]"   // perfect for your layout width
// />
// <FloatingInputMochi
//             src="/retro-computer.png"
//             size={40}
//             className="-top-40 -right-10"
//           />



//            <FloatingInputMochi
//             src="/retro-computer.png"
//             size={35}
//             className="-top-25 -left-8"
//           />
//            <FloatingInputMochi
//             src="/retro-computer.png"
//             size={35}
//             className="-top-25 -left-8"
//           />
//       {/* 🌸 MOBILE */}
//       <div className="md:hidden flex flex-col h-screen w-full overflow-hidden">

//         <Suspense fallback={<p>Loading...</p>}>
//           <ProjectHeader projectId={projectId} />
//         </Suspense>

//         <div className="flex-1 overflow-y-auto overflow-x-hidden">

//           {tabState === "messages" && (
//             <Suspense fallback={<p>Loading Messages...</p>}>
//               <MessagesContainer
//                 projectId={projectId}
//                 activeFragment={activeFragment}
//                 setActiveFragment={setActiveFragment}
//               />
//             </Suspense>
//           )}

//           {tabState === "preview" && (
//             <div className="w-full overflow-x-hidden bg-input">
//               <div className="w-full max-w-[700px] mx-auto">

//                 {/* ⭐ FIX: removed h-screen so preview stays at top */}
//                 <div className="w-full">
//                   {activeFragment && <FragmentWeb data={activeFragment} />}
//                 </div>

//               </div>
//             </div>
//           )}

//           {tabState === "code" && (
//             <div className="w-full h-full p-2 overflow-x-hidden">
//               {!!activeFragment?.files && (
//                 <FileExplorer
//                   files={activeFragment.files as { [path: string]: string }}
//                 />
//               )}
//             </div>
//           )}

//         </div>

//         {/* bottom tabs */}
//         <div className="w-full bg-card border-t border-muted shadow-inner p-2 flex justify-between gap-2">

//           <button
//             onClick={() => setTabState("messages")}
//             className={`flex-1 px-4 py-2 rounded-lg font-medium ${
//               tabState === "messages"
//                 ? "bg-primary text-primary-foreground"
//                 : "bg-input"
//             }`}
//           >
//             Chat
//           </button>

//           <button
//             onClick={() => setTabState("preview")}
//             className={`flex-1 px-4 py-2 rounded-lg font-medium flex justify-center items-center gap-2 ${
//               tabState === "preview"
//                 ? "bg-primary text-primary-foreground"
//                 : "bg-input"
//             }`}
//           >
//             <EyeIcon className="size-4" /> Demo
//           </button>

//           <button
//             onClick={() => setTabState("code")}
//             className={`flex-1 px-4 py-2 rounded-lg font-medium flex justify-center items-center gap-2 ${
//               tabState === "code"
//                 ? "bg-primary text-primary-foreground"
//                 : "bg-input"
//             }`}
//           >
//             <CodeIcon className="size-4" /> Code
//           </button>

//         </div>
//       </div>

//       {/* 🌸 DESKTOP */}
//       <div className="hidden md:block h-screen w-full overflow-hidden">
//         <ResizablePanelGroup direction="horizontal">

//           <ResizablePanel defaultSize={35} minSize={20} className="flex flex-col min-h-0">
//             <Suspense fallback={<p>Loading Project...</p>}>
//               <ProjectHeader projectId={projectId} />
//             </Suspense>

//             <Suspense fallback={<p>Loading Messages...</p>}>
//               <MessagesContainer
//                 projectId={projectId}
//                 activeFragment={activeFragment}
//                 setActiveFragment={setActiveFragment}
//               />
//             </Suspense>
//           </ResizablePanel>

//           <ResizableHandle className="hover:bg-primary transition-colors" />

//           <ResizablePanel defaultSize={65} minSize={50} className="bg-input overflow-hidden">
//             <Tabs
//               className="h-full"
//               defaultValue="preview"
//               value={tabState === "messages" ? "preview" : tabState}
//               onValueChange={(v) =>
//                 setTabState(v as "preview" | "code" | "messages")
//               }
//             >

//               <div className="w-full flex items-center p-2 gap-x-2 bg-card border-b border-muted">

//                 <TabsList className="h-8 p-0 border bg-input rounded-none shadow-sm">

//                   <TabsTrigger
//                     value="preview"
//                     className="rounded-none px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
//                   >
//                     <EyeIcon className="size-4" />
//                     Demo
//                   </TabsTrigger>

//                   <TabsTrigger
//                     value="code"
//                     className="rounded-none px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
//                   >
//                     <CodeIcon className="size-4" />
//                     Code
//                   </TabsTrigger>

//                 </TabsList>

//                 <div className="ml-auto flex items-center gap-x-2">
//                   {!hasProAccess && (
//                     <Button asChild size="sm" variant="premium">
//                       <Link href="/pricing">
//                         <CrownIcon /> Upgrade
//                       </Link>
//                     </Button>
//                   )}
//                   <UserControl />
//                 </div>
//               </div>

//               {/* ⭐ FIX: no h-screen here => no scrolling to bottom */}
//               <TabsContent
//                 value="preview"
//                 className="w-full overflow-hidden flex justify-center"
//               >
//                 <div className="w-full max-w-[900px] overflow-hidden">
//                   {!!activeFragment && <FragmentWeb data={activeFragment} />}
//                 </div>
//               </TabsContent>

//               <TabsContent value="code" className="min-h-0 overflow-hidden">
//                 {!!activeFragment?.files && (
//                   <FileExplorer
//                     files={activeFragment.files as { [path: string]: string }}
//                   />
//                 )}
//               </TabsContent>

//             </Tabs>
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </div>

//     </div>
//   );
// };


"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Suspense, useEffect, useState } from "react";
import MessagesContainer from "../components/messages-container";
import { FragmentWeb } from "../components/fragment-web";
import { ProjectHeader } from "../components/project-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeIcon, EyeIcon, CrownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Fragment } from "@/lib/generated/prisma";
import { UserControl } from "../components/ui/user-control";
import { FileExplorer } from "../components/ui/file-explorer";
import { FloatingInputMochi } from "@/components/ui/FloatingInputMochi";

interface Props {
  projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
  const { has } = useAuth();
  const hasProAccess = has?.({ plan: "pro" });

  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);

  const [tabState, setTabState] = useState<"messages" | "preview" | "code">(
    "messages"
  );

  // Detect latest fragment from sandbox iframe
  useEffect(() => {
    const timer = setInterval(() => {
      const iframe = document.querySelector<HTMLElement>("[data-sandbox-url]");
      if (iframe && !activeFragment) {
        setActiveFragment(
          // @ts-ignore
          iframe.dataset.fragment as Fragment
        );
        clearInterval(timer);
      }
    }, 500);
  }, [activeFragment]);

  return (
    <div className="relative h-screen w-full overflow-x-hidden bg-background">

 





      {/* 🌸 MOBILE LAYOUT */}
      <div className="md:hidden flex flex-col h-full w-full overflow-hidden relative z-[10]">

        <Suspense fallback={<p>Loading...</p>}>
          <ProjectHeader projectId={projectId} />
        </Suspense>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">

          {tabState === "messages" && (
            <Suspense fallback={<p>Loading Messages...</p>}>
              <MessagesContainer
                projectId={projectId}
                activeFragment={activeFragment}
                setActiveFragment={setActiveFragment}
              />
            </Suspense>
          )}

          {tabState === "preview" && (
            <div className="w-full overflow-x-hidden bg-input">
              <div className="w-full max-w-[700px] mx-auto">
                <div className="w-full">
                  {activeFragment && <FragmentWeb data={activeFragment} />}
                </div>
              </div>
            </div>
          )}

          {tabState === "code" && (
            <div className="w-full h-full p-2 overflow-x-hidden">
              {!!activeFragment?.files && (
                <FileExplorer
                  files={activeFragment.files as { [path: string]: string }}
                />
              )}
            </div>
          )}

        </div>

        {/* bottom tabs */}
        <div className="w-full bg-card border-t border-muted shadow-inner p-2 flex justify-between gap-2">

          <button
            onClick={() => setTabState("messages")}
            className={`flex-1 px-4 py-2 rounded-lg font-medium ${
              tabState === "messages"
                ? "bg-primary text-primary-foreground"
                : "bg-input"
            }`}
          >
            Chat
          </button>

          <button
            onClick={() => setTabState("preview")}
            className={`flex-1 px-4 py-2 rounded-lg font-medium flex justify-center items-center gap-2 ${
              tabState === "preview"
                ? "bg-primary text-primary-foreground"
                : "bg-input"
            }`}
          >
            <EyeIcon className="size-4" /> Demo
          </button>

          <button
            onClick={() => setTabState("code")}
            className={`flex-1 px-4 py-2 rounded-lg font-medium flex justify-center items-center gap-2 ${
              tabState === "code"
                ? "bg-primary text-primary-foreground"
                : "bg-input"
            }`}
          >
            <CodeIcon className="size-4" /> Code
          </button>

        </div>
      </div>

      {/* 🌸 DESKTOP LAYOUT */}
      <div className="hidden md:block h-full w-full overflow-hidden relative z-[10]">
        <ResizablePanelGroup direction="horizontal">

          <ResizablePanel defaultSize={35} minSize={20} className="flex flex-col min-h-0">
            <Suspense fallback={<p>Loading Project...</p>}>
              <ProjectHeader projectId={projectId} />
            </Suspense>

            <Suspense fallback={<p>Loading Messages...</p>}>
              <MessagesContainer
                projectId={projectId}
                activeFragment={activeFragment}
                setActiveFragment={setActiveFragment}
              />
            </Suspense>
          </ResizablePanel>

          <ResizableHandle className="hover:bg-primary transition-colors" />

          <ResizablePanel defaultSize={65} minSize={50} className="bg-input overflow-hidden">
            <Tabs
              className="h-full"
              defaultValue="preview"
              value={tabState === "messages" ? "preview" : tabState}
              onValueChange={(v) =>
                setTabState(v as "preview" | "code" | "messages")
              }
            >

              <div className="w-full flex items-center p-2 gap-x-2 bg-card border-b border-muted">

                <TabsList className="h-8 p-0 border bg-input rounded-none shadow-sm">

                  <TabsTrigger
                    value="preview"
                    className="rounded-none px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <EyeIcon className="size-4" />
                    Demo
                  </TabsTrigger>

                  <TabsTrigger
                    value="code"
                    className="rounded-none px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <CodeIcon className="size-4" />
                    Code
                  </TabsTrigger>

                </TabsList>

                <div className="ml-auto flex items-center gap-x-2">
                  {!hasProAccess && (
                    <Button asChild size="sm" variant="premium">
                      <Link href="/pricing">
                        <CrownIcon /> Upgrade
                      </Link>
                    </Button>
                  )}
                  <UserControl />
                </div>
              </div>

              <TabsContent
                value="preview"
                className="w-full overflow-hidden flex justify-center"
              >
                <div className="w-full max-w-[900px] overflow-hidden">
                  {!!activeFragment && <FragmentWeb data={activeFragment} />}
                </div>
              </TabsContent>

              <TabsContent value="code" className="min-h-0 overflow-hidden">
                {!!activeFragment?.files && (
                  <FileExplorer
                    files={activeFragment.files as { [path: string]: string }}
                  />
                )}
              </TabsContent>

            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

    </div>
  );
};

