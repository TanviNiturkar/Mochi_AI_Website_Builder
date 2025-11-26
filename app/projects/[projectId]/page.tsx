

import { ProjectView } from '@/modules/projects/ui/views/project-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';


interface Props  {
    params : Promise<{
        projectId : string
    }>
}

const Page = async ({params}: Props) =>{
const {projectId} = await params;
const queryClient =  getQueryClient();
void queryClient.prefetchQuery(trpc.messages.getMany.queryOptions({
  projectId,

}));
void queryClient.prefetchQuery(trpc.projects.getOne.queryOptions({
 id: projectId,

}));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
     
      <Suspense
  fallback={
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
      {/* Soft pastel spinning circle */}
      <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
      {/* Loading text */}
      <p className="text-pink-400 text-lg font-semibold animate-pulse">
        Loading your project...
      </p>
    </div>
  }
>
  <ProjectView projectId={projectId}/>
</Suspense>
    
    
    </HydrationBoundary>
  )
}
export default Page