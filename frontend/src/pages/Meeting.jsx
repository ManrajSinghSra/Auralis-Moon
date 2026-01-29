import { MeetingDialog } from '@/component/MeetingDialog'
import { MeetingStatusDropDown } from '@/component/MeetingStatusDropDown'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus} from 'lucide-react'
import React, { useState } from 'react'

const Meeting = () => {

  const [open,setOpen]=useState(false);
  return (
      <div className='mt-3 ml-3'>
        <div className='flex justify-between items-baseline'>
          <h1 className='text-4xl font-extrabold flex justify-baseline'  >My Meetings</h1>
          <Button className="bg-blue-950 mr-4" onClick={()=>setOpen(!open)} ><Plus/> New Meeting</Button>
        </div>
        <div className='mt-5 flex gap-4'>
          <Input placeholder="Search Meeting" className="w-[30%]"/>
          <MeetingStatusDropDown />
        </div>
        <MeetingDialog  open={open} setOpen={setOpen} /> 


    </div>
  )
}

export default Meeting