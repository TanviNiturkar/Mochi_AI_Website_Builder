// import { useForm } from "react-hook-form";
// import z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormField } from "@/components/ui/form";
// import { cn } from "@/lib/utils";
// import { useState } from "react";
// import TextareaAutosize from "react-textarea-autosize";
// import { Button } from "@/components/ui/button";
// import { ArrowUpIcon, Loader2Icon } from "lucide-react";
// import { useTRPC } from "@/trpc/client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { da } from "date-fns/locale";
// import { PROJECT_TEMPLATES } from "../constant";
// import { useClerk } from "@clerk/nextjs";


// const formSchema = z.object({
//   Value: z
//     .string()
//     .min(1, { message: "Message is required" })
//     .max(10000, { message: "Message is too long" }),
// });
// export const ProjectForm = () => {
//   const clerk = useClerk();
//   const [isFocused, setIsFocused] = useState(false);
//   const router = useRouter();
//   const trpc = useTRPC();
// const queryClient = useQueryClient()
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       Value: "",
//     },
//   });

//   const createProject = useMutation(trpc.projects.create.mutationOptions({
//     onSuccess: (data) => {
      
//       queryClient.invalidateQueries(trpc.projects.getMany.queryOptions() 
//     );
//     queryClient.invalidateQueries(trpc.usage.status.queryOptions());
//     router.push(`/projects/${data.id}`);
      
//     },
//     onError: (err) => { 
//       toast.error(err.message); 
//       if(err.data?.code === "UNAUTHORIZED"){
//         clerk.openSignIn();
        
//       }
//       if(err.data?.code === "TOO_MANY_REQUESTS"){
//         router.push("/pricing");
//       }
//     },
      

//   }));

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     await createProject.mutateAsync({
//       Value: values.Value,
      
//     });
//   };
//   const onSelect=(value : string) => {
//     form.setValue("Value",value , {
//         shouldValidate: true,
//         shouldDirty: true,
//         shouldTouch: true,
    
//     }) };

//   const isPending = createProject.isPending;
//   const isDisabled = isPending || !form.formState.isValid;

//   return (
//     <Form {...form}>
//         <section className="space-y-6">
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className={cn(
//           "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
//           isFocused && "shadow-xs",
          
//         )}
//       >
//         <FormField
//           control={form.control}
//           name="Value"
//           render={({ field }) => (
//             <TextareaAutosize
//               {...field}
//               disabled={isPending}
//               onFocus={() => setIsFocused(true)}
//               onBlur={() => setIsFocused(false)}
//               minRows={2}
//               maxRows={8}
//               className="pt-4 resize-none border-none w-full outline-none bg-transparent"
//               placeholder="What would you like to build?"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
//                   e.preventDefault();
//                   form.handleSubmit(onSubmit)(e);
//                 }
//               }}
//             />
//           )}
//         />
//         <div className="flex gap-x-2 items-end justify-between pt-2">
//           <div className="text-[10px] text-muted-foreground font-mono">
//             <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
//               <span>&#8984;</span> Enter
//             </kbd>
//             &nbsp;to submit
//           </div>
//           <Button
//             disabled={isDisabled}
//             className={cn(
//               "size-8 rounded-full",
//               isDisabled && "bg-muted-foreground border"
//             )}
//           >
//             {isPending ? (
//               <Loader2Icon className="size-4 animate-spin" />
//             ) : (
//               <ArrowUpIcon />
//             )}
//           </Button>
//         </div>
//       </form>
      
//       <div className="flex-wrap justify-center gap-2 hidden md:flex max-w-3xl">
//         {PROJECT_TEMPLATES.map((template) => (
//           <Button
//             key={template.title}
//             variant="outline"
//             size="sm"
//             className="bg-white dark:bg-sidebar"
//             onClick={() => onSelect(template.prompt)}>
//                     {template.emoji} {template.title}
//             </Button>
        
        
//           )  )}
//       </div>
//       </section>
//     </Form>
//   );
// };


"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PROJECT_TEMPLATES } from "../constant";
import { useClerk } from "@clerk/nextjs";

// 🌸 Floating mochi component
import { FloatingInputMochi } from "@/components/ui/FloatingInputMochi";

const formSchema = z.object({
  Value: z.string().min(1).max(10000),
});

export const ProjectForm = () => {
  const clerk = useClerk();
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { Value: "" },
  });

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(trpc.projects.getMany.queryOptions());
        queryClient.invalidateQueries(trpc.usage.status.queryOptions());
        router.push(`/projects/${data.id}`);
      },
      onError: (err) => {
        toast.error(err.message);
        if (err.data?.code === "UNAUTHORIZED") clerk.openSignIn();
        if (err.data?.code === "TOO_MANY_REQUESTS") router.push("/pricing");
      },
    })
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createProject.mutateAsync({ Value: values.Value });
  };

  const onSelect = (value: string) => {
    form.setValue("Value", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const isPending = createProject.isPending;
  const isDisabled = isPending || !form.formState.isValid;

  return (
    <Form {...form}>
      <section className="space-y-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
            isFocused && "shadow-xs"
          )}
        >

          {/* 🌸 Mochi #1 — near title */}
          <FloatingInputMochi
            src="/mochi-fly.png"
            size={34}
            className="-top-6 right-6"
          />
   <FloatingInputMochi
            src="/retro-computer.png"
            size={34}
            className="-top-8 left-[410px]"
          />
          <FloatingInputMochi
            src="/mochi-fly.png"
            size={34}
            className="-top-30 left-[310px]"
          />
          {/* 🌸 Mochi #2 — near Enter text */}
          <FloatingInputMochi
            src="/mochi-sleep.png"
            size={45}
            className="bottom-[55px] left-6"
          />

          {/* 🌸 Mochi-drink next to "Start a New Project" */}
<FloatingInputMochi
  src="/mochi-drink.png"
  size={30}
  className="-top-10 left-[210px]"   // perfect for your layout width
/>
<FloatingInputMochi
            src="/retro-computer.png"
            size={40}
            className="-top-40 -right-10"
          />
<FloatingInputMochi
            src="/mochi-sleep.png"
            size={55}
            className="-bottom-50 -right-10"
          />

<FloatingInputMochi
            src="/mochi-fly.png"
            size={45}
            className="-bottom-50 -left-20"
          />
          
          <FloatingInputMochi
            src="/retro-computer.png"
            size={45}
            className="-bottom-70 -left-40"
          />
          <FloatingInputMochi
            src="/mochi-sleep.png"
            size={55}
            className="-bottom-150 -right-10"
          />
          {/* 🌸 Mochi #4 — bottom-right corner */}
          <FloatingInputMochi
            src="/retro-computer.png"
            size={40}
            className="-bottom-5 -right-5"
          />
           <FloatingInputMochi
            src="/retro-computer.png"
            size={35}
            className="-top-25 -left-8"
          />
            <FloatingInputMochi
            src="/mochi-fly.png"
            size={45}
            className="-bottom-155 -left-8"
          />
            <FloatingInputMochi
            src="/mochi-sleep.png"
            size={55}
            className="-bottom-105 -left-10"
          />
          <FloatingInputMochi
            src="/retro-computer.png"
            size={45}
            className="-bottom-135 -right-38"
          />
           <FloatingInputMochi
            src="/mochi-fly.png"
            size={38}
            className="-top-35 left-5"
          />
          {/* 🌸 Mochi #4 — bottom-right corner */}
          <FloatingInputMochi
            src="/mochi-drink.png"
            size={35}
            className="-bottom-5 -left-10"
          />
           <FloatingInputMochi
            src="/mochi-drink.png"
            size={35}
            className="-bottom-15 -right-10"
          />

<FloatingInputMochi
            src="/mochi-sleep.png"
            size={50}
            className="-bottom-9 right-[230px]"
          />
          <FloatingInputMochi
            src="/mochi-sleep.png"
            size={50}
            className="-bottom-199 right-[230px]"
          />
          
          
          <FloatingInputMochi
            src="/mochi-fly.png"
            size={50}
            className="-bottom-49 right-[230px]"
          />
                    <FloatingInputMochi
            src="/mochi-drink.png"
            size={40}
            className="-bottom-79 right-[230px]"
          />

          {/* TEXT INPUT */}
          <FormField
            control={form.control}
            name="Value"
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                disabled={isPending}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                minRows={2}
                maxRows={8}
                className="pt-4 resize-none border-none w-full outline-none bg-transparent"
                placeholder="What would you like to build?"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)(e);
                  }
                }}
              />
            )}
          />

          {/* FOOTER */}
          <div className="flex gap-x-2 items-end justify-between pt-2">
            <div className="text-[10px] text-muted-foreground font-mono">
              <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium">
                <span>⌘</span> Enter
              </kbd>
              &nbsp;to submit
            </div>

            <Button
              disabled={isDisabled}
              className={cn(
                "size-8 rounded-full",
                isDisabled && "bg-muted-foreground border"
              )}
            >
              {isPending ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <ArrowUpIcon />
              )}
            </Button>
          </div>
        </form>

        <div className="flex-wrap justify-center gap-2 hidden md:flex max-w-3xl">
          {PROJECT_TEMPLATES.map((template) => (
            <Button
              key={template.title}
              variant="outline"
              size="sm"
              className="bg-white dark:bg-sidebar"
              onClick={() => onSelect(template.prompt)}
            >
              {template.emoji} {template.title}
            </Button>
          ))}
        </div>
      </section>
    </Form>
  );
};

