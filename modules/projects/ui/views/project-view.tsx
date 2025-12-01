// "use client";
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import { useTRPC } from "@/trpc/client";
// import { useSuspenseQuery } from "@tanstack/react-query";
// import MessagesContainer from "../components/messages-container";
// import { Suspense, useState } from "react";
// import { Fragment } from "@/lib/generated/prisma";
// import { ProjectHeader } from "../components/project-header";
// import { FragmentWeb } from "../components/fragment-web";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CodeIcon, CrownIcon, EyeIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { CodeView } from "../components/code-view";

// import { UserControl } from "../components/ui/user-control";
// import { useAuth } from "@clerk/nextjs";
// import { FileExplorer } from "../components/ui/file-explorer";
// import { ErrorBoundary } from "react-error-boundary";

// interface Props {
//   projectId: string;
// }
// export const ProjectView = ({ projectId }: Props) => {
//    const {has} = useAuth();
//     const hasProAccess= has?.({plan: "pro"}) 
//   //const trpc = useTRPC();
//   //   const { data: project } = useSuspenseQuery(
//   //     trpc.projects.getOne.queryOptions({
//   //       id: projectId,
//   //     })
//   //   );

//   const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
//   const [tabState, setTabState] = useState<"preview" | "code">("preview");
//   const isFreeTier = has?.({plan: "free_user"})

//   return (
//     <div className="h-screen">
//       <ResizablePanelGroup direction="horizontal">
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
//             />{" "}
//           </Suspense>
          
//         </ResizablePanel>
//         <ResizableHandle className="hover:bg-primary transition-colors" ></ResizableHandle>
//         <ResizablePanel defaultSize={65} minSize={50}>
//           <Tabs
//             className="h-full gap-y-8"
//             defaultValue="preview"
//             value={tabState}
//             onValueChange={(value) => setTabState(value as "preview" | "code")}

//           >
//             <div className="w-full flex items-center p-2 border-b gap-x-2">
//               <TabsList className="h-8 p-0 border rounded-md">
//                 <TabsTrigger value="preview" className="rounded-md">
//                   <EyeIcon />
//                   <span>Demo</span>
//                 </TabsTrigger>
//                 <TabsTrigger value="code" className="rounded-md">
//                   <CodeIcon />
//                   <span>Code</span>
//                 </TabsTrigger>
//               </TabsList>
//               <div className="ml-auto flex items-center gap-x-2">
//                 {!hasProAccess && (
//                 <Button asChild size="sm" variant="tertiary">
//                   <Link href="/pricing">
//                     <CrownIcon /> Upgrade
//                   </Link>
//                 </Button>
//                 )}
//                 <UserControl />
//               </div>
//             </div>
//             <TabsContent value="preview">
//               {" "}
//               {!!activeFragment && <FragmentWeb data={activeFragment} />}{" "}
//             </TabsContent>
//             <TabsContent value="code" className="min-h-0">
//               {!!activeFragment?.files && (
//                 <FileExplorer files={activeFragment.files as { [path: string]:string }}/>
//               )}
//             </TabsContent>
//           </Tabs>
//         </ResizablePanel>
//       </ResizablePanelGroup>
//     </div>
//   );
// };


'use client';

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

interface Props {
  projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
  const { has } = useAuth();
  const hasProAccess = has?.({ plan: "pro" });

  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [tabState, setTabState] = useState<"preview" | "code">("preview");

  // ⚡ AUTO-SELECT LATEST FRAGMENT WITH SANDBOX URL
  useEffect(() => {
    const checkLatestFragment = async () => {
      // Wait for messages/fragments to populate (optional delay if needed)
      // This assumes MessagesContainer updates fragments state
      const interval = setInterval(() => {
        const iframeFragment = document.querySelector<HTMLElement>(
          '[data-sandbox-url]'
        );
        if (iframeFragment && !activeFragment) {
          setActiveFragment(
            // @ts-ignore
            iframeFragment.dataset.fragment as Fragment
          );
          clearInterval(interval);
        }
      }, 500);
    };
    checkLatestFragment();
  }, [activeFragment]);

  return (
    <div className="h-screen">
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

        <ResizablePanel defaultSize={65} minSize={50}>
          <Tabs
            className="h-full gap-y-8"
            defaultValue="preview"
            value={tabState}
            onValueChange={(value) => setTabState(value as "preview" | "code")}
          >
            <div className="w-full flex items-center p-2 border-b gap-x-2">
              <TabsList className="h-8 p-0 border rounded-md">
                <TabsTrigger value="preview" className="rounded-md">
                  <EyeIcon /> <span>Demo</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="rounded-md">
                  <CodeIcon /> <span>Code</span>
                </TabsTrigger>
              </TabsList>

              <div className="ml-auto flex items-center gap-x-2">
                {!hasProAccess && (
                  <Button asChild size="sm" variant="tertiary">
                    <Link href="/pricing">
                      <CrownIcon /> Upgrade
                    </Link>
                  </Button>
                )}
                <UserControl />
              </div>
            </div>

            <TabsContent value="preview">
              {!!activeFragment && <FragmentWeb data={activeFragment} />}
            </TabsContent>

            <TabsContent value="code" className="min-h-0">
              {!!activeFragment?.files && (
                <FileExplorer files={activeFragment.files as { [path: string]: string }} />
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

