// "use client"

// import { Button } from "@/components/ui/button";
// import { useTRPC } from "@/trpc/client"
// import { useUser } from "@clerk/nextjs";
// import { useQuery } from "@tanstack/react-query";
// import { formatDistanceToNow } from "date-fns";
// import Image from "next/image";
// import Link from "next/link";


// export const ProjectsList = () => {


//     const trpc = useTRPC();
//     const {user} = useUser();
//     const {data:projects} = useQuery(trpc.projects.getMany.queryOptions());
    
//     if(!user){
//         return null;
//     }

//     return (
//         <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border flex flex-col gap-y-6 sm:gap-y-4">
//             <h2 className="text-2xl font-semibold">{user?.firstName}&apos;s Mochies</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                 {projects?.length === 0 && (
//                     <div className="col-span-full text-center">
//                         <p className="text-sm text-muted-foreground">No projects found</p>
//                     </div>
//                     )}
//                     {projects?.map((project)=>(
//                         <Button key={project.id}
//                         variant="outline"
//                         className="font-normal h-auto justify-start w-full text-start p-4" 
//                         asChild>
//                             <Link href={`/projects/${project.id}`}>
//                             <div className="flex items-center gap-x-4">
//                                 <Image 
//                                 src="/logo1.png" alt="Mochi" width={32} height={32} className="object-contain"/>
//                                 <div className="flex flex-col">
//                                     <h3 className="truncate font-medium"> {project.name} 
//                                     </h3>
//                                     <p className="text-sm text-foreground">{formatDistanceToNow(project.updatedAt,{
//                                         addSuffix:true,
//                                     })}</p>
//                                 </div>    
//                             </div></Link>
//                         </Button>
//                     ))}
//             </div>
//         </div>
//     )


// }



// // "use client"

// // import { Button } from "@/components/ui/button";
// // import { useTRPC } from "@/trpc/client";
// // import { useUser } from "@clerk/nextjs";
// // import { useQuery } from "@tanstack/react-query";
// // import { formatDistanceToNow } from "date-fns";
// // import Image from "next/image";
// // import Link from "next/link";

// // export const ProjectsList = () => {
// //   const trpc = useTRPC();
// //   const { user } = useUser();
// //   const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());

// //   if (!user) return null;

// //   return (
// //     <div className="w-full flex flex-col gap-y-6 sm:gap-y-4 mt-16">

// //       <h2 className="text-2xl font-semibold text-denim">
// //         {user?.firstName}&apos;s Mochies
// //       </h2>

// //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

// //         {projects?.length === 0 && (
// //           <div className="col-span-full text-center">
// //             <p className="text-sm text-denim/60">No projects found</p>
// //           </div>
// //         )}

// //         {projects?.map((project) => (
// //           <Button
// //             key={project.id}
// //             variant="outline"
// //             className="
// //               font-normal h-auto justify-start w-full text-start p-4
// //               bg-[#FEF3DA]      /* 👈 only this changed */
// //               rounded-xl
// //             "
// //             asChild
// //           >
// //             <Link href={`/projects/${project.id}`}>
// //               <div className="flex items-center gap-x-4">
// //                 <Image 
// //                   src="/logo1.png"
// //                   alt="Mochi"
// //                   width={32}
// //                   height={32}
// //                 />
                
// //                 <div className="flex flex-col">
// //                   <h3 className="truncate font-medium text-denim">
// //                     {project.name}
// //                   </h3>

// //                   <p className="text-sm text-denim/60">
// //                     {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
// //                   </p>
// //                 </div>
// //               </div>
// //             </Link>
// //           </Button>
// //         ))}

// //       </div>
// //     </div>
// //   );
// // };




"use client"

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export const ProjectsList = () => {
  const trpc = useTRPC();
  const { user } = useUser();
  const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());

  if (!user) return null;

  return (
    <div
      className="
        w-full 
        bg-[#FEF3DA]                /* 🌸 same as input form */
        border border-cactus/30
        rounded-2xl
        p-8
        shadow-md
        flex flex-col gap-y-6 sm:gap-y-4
      "
    >
      <h2 className="text-2xl font-semibold text-denim">
        {user?.firstName}&apos;s Mochies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {projects?.length === 0 && (
          <div className="col-span-full text-center">
            <p className="text-sm text-denim/60">No projects found</p>
          </div>
        )}

        {projects?.map((project) => (
         <Button
  key={project.id}
  variant="outline"
  className="
    font-normal h-auto justify-start w-full text-start p-4
    bg-[#DCE3C2]
    border border-cactus/40
    rounded-xl
  "
  asChild
>
            <Link href={`/projects/${project.id}`}>
              <div className="flex items-center gap-x-4">
                <Image
                  src="/mochi-drink.png"
                  alt="Mochi"
                  width={32}
                  height={32}
                />

                <div className="flex flex-col">
                  <h3 className="truncate font-medium text-denim">
                    {project.name}
                  </h3>
                  <p className="text-sm text-denim/60">
                    {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

