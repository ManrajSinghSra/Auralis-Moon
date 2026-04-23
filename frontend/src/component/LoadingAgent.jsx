import React from 'react'
import { Loader2Icon } from 'lucide-react'
export const LoadingAgent = () => {
  return (
    <div className='rounded-4xl gap-10 flex flex-col items-center justify-center border-2 border-accent mt-50 h-80 w-70 p-2'>
      <Loader2Icon  className='animate-spin size-10 text-blue-900'/>
      <h1 className='text-2xl'>Loading Agents</h1>
      <h1>This may take a few seconds......</h1>
    </div>
  )
}