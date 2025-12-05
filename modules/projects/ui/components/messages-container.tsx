// "use client";
// import { useTRPC } from "@/trpc/client";
// import { useSuspenseQuery } from "@tanstack/react-query";
// import React, { useEffect, useRef } from "react";
// import { MessageCard } from "./message-card";
// import { MessageForm } from "./message-form";
// import { Fragment } from "@/lib/generated/prisma";
// import { is } from "date-fns/locale";
// import { MessageLoading } from "./message-loading";

// interface Props {
//   projectId: string;
//   activeFragment : Fragment | null;
//   setActiveFragment : (fragment : Fragment | null) => void; 
// }

// const MessagesContainer = ({ projectId,activeFragment,setActiveFragment }: Props) => {
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const trpc = useTRPC();
//   const lastAssistantMessageIdRef = useRef<string | null>(null);

//   const { data: messages } = useSuspenseQuery(
//     trpc.messages.getMany.queryOptions({
//       projectId: projectId,
//     } , {
//     refetchInterval: 2000,
//   })
//   );

//  useEffect(() => {
//   // Existing logic: select last assistant message
//   const lastAssistantMessage = messages.findLast((message => message.role === "ASSISTANT"));
//   if (lastAssistantMessage?.fragment && lastAssistantMessage.id !== lastAssistantMessageIdRef.current) {
//     setActiveFragment(lastAssistantMessage.fragment);
//     lastAssistantMessageIdRef.current = lastAssistantMessage.id;
//   }

//   // ⚡ New logic: auto-select latest fragment with sandboxUrl if none is active
//   if (!activeFragment) {
//     const latestWithSandbox = messages
//       .map(msg => msg.fragment)
//       .filter(frag => frag?.sandboxUrl)
//       .filter(Boolean)
//       .slice(-1)[0] as Fragment | undefined;

//     if (latestWithSandbox) setActiveFragment(latestWithSandbox);
//   }

// }, [messages, setActiveFragment, activeFragment]);



//   useEffect(() => {
//     bottomRef.current?.scrollIntoView();
//   }, [messages.length]);

// const lastMessage = messages[messages.length -1];
// const isLastMessageUser = lastMessage?.role === "USER";

//   return (
//     <div className="flex flex-col flex-1 min-h-0">
//       <div className="flex-1 min-h-0 overflow-y-auto">
//         <div className="pt-2 pr-1">
//           {messages.map((message) => (
//             <MessageCard
//               key={message.id}
//               content={message.content}
//               role={message.role}
//               fragment={message.fragment}
//               createdAt={message.createdAt}
//               isActiveFragment={activeFragment?.id === message.fragment?.id}
//               onFragmentClick={() => { setActiveFragment(message.fragment); }}
//               type={message.type}
//             />
//           ))}
//           {isLastMessageUser && <MessageLoading />}
//           <div ref={bottomRef} />
//         </div>
//       </div>
//       <div className="relative p-3 pt-1">
//         <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-background/70 pointer-events-none" />
//         <MessageForm projectId={projectId} />
//       </div>
//     </div>
//   );
// };

// export default MessagesContainer;


"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { MessageCard } from "./message-card";
import { MessageForm } from "./message-form";
import { Fragment } from "@/lib/generated/prisma";
import { MessageLoading } from "./message-loading";

interface Props {
  projectId: string;
  activeFragment: Fragment | null;
  setActiveFragment: (fragment: Fragment | null) => void;
}

const MessagesContainer = ({
  projectId,
  activeFragment,
  setActiveFragment,
}: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const trpc = useTRPC();
  const lastAssistantMessageIdRef = useRef<string | null>(null);

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions(
      {
        projectId,
      },
      {
        refetchInterval: 2000,
      }
    )
  );

  useEffect(() => {
    const lastAssistantMessage = messages.findLast(
      (m) => m.role === "ASSISTANT"
    );

    if (
      lastAssistantMessage?.fragment &&
      lastAssistantMessage.id !== lastAssistantMessageIdRef.current
    ) {
      setActiveFragment(lastAssistantMessage.fragment);
      lastAssistantMessageIdRef.current = lastAssistantMessage.id;
    }

    if (!activeFragment) {
      const latestWithSandbox = messages
        .map((msg) => msg.fragment)
        .filter((f) => f?.sandboxUrl)
        .slice(-1)[0] as Fragment | undefined;

      if (latestWithSandbox) setActiveFragment(latestWithSandbox);
    }
  }, [messages, setActiveFragment, activeFragment]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage?.role === "USER";

  return (
    <div className="flex flex-col flex-1 min-h-0">

      {/* ✅ Scrollable chat area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-1 pb-20">
        <div className="pt-2 pr-1">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              content={message.content}
              role={message.role}
              fragment={message.fragment}
              createdAt={message.createdAt}
              isActiveFragment={activeFragment?.id === message.fragment?.id}
              onFragmentClick={() => setActiveFragment(message.fragment)}
              type={message.type}
            />
          ))}

          {isLastMessageUser && <MessageLoading />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* ✅ Sticky Input Bar */}
      <div className="sticky bottom-0 left-0 right-0 bg-background p-3 shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.1)]">
        {/* Top fade gradient */}
        <div className="absolute -top-5 left-0 right-0 h-5 bg-gradient-to-b from-transparent to-background/80 pointer-events-none" />
        <MessageForm projectId={projectId} />
      </div>
    </div>
  );
};

export default MessagesContainer;
