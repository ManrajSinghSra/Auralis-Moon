import { MeetingDialog } from '@/component/MeetingDialog'
import  MeetingList from '@/component/MeetingList'
import { MeetingStatusDropDown } from '@/component/MeetingStatusDropDown'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { URL } from '@/CONST'
import { Plus} from 'lucide-react'
import { useEffect, useState } from 'react' 
import { useSelector } from 'react-redux'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'

const Meeting = () => {

  const [open,setOpen]=useState(false);

  const [meeting,setMeeting]=useState([]);
  const match=useMatch("/meeting/meetingRoom"); 
  const meetingName=useSelector((state)=>state?.meetingName?.name);
 
  const nav=useNavigate() 

  useEffect(()=>{
    const fetchData=async()=>{
      const res=await fetch(`${URL}/meeting/all`,{credentials:"include"});
      const data=await res.json(); 
      
      if(res.status){
        setMeeting(data.data);
      }
      else{
        console.log(data)
      }
    }
    fetchData(); 
  },[open])
  return (
      <div className='mt-3 ml-3'>
        <div className='flex justify-between items-baseline'>
          {!match && <h1 className='text-4xl font-extrabold flex justify-baseline' >My Meetings</h1>}
          {match &&<div className='flex items-center gap-3'> 
          <h1 className='text-4xl font-extrabold flex justify-baseline hover:text-gray-500 hover:cursor-pointer' onClick={()=>nav("/meeting")} >My Meetings</h1>
          <span>&gt;&gt;</span>
          <span className='text-3xl font-extrabold'> {meetingName}</span> 
           </div> }

          <Button className="bg-blue-950 mr-4" onClick={()=>setOpen(!open)} ><Plus/> New Meeting</Button>
        </div>
        <div className='mt-5 flex gap-4'>
         {!match &&<> <Input placeholder="Search Meeting" className="w-[30%]"/>
          <MeetingStatusDropDown /></>}
        </div>
        <MeetingDialog  open={open} setOpen={setOpen} /> 
        { !match ? <MeetingList meeting={meeting} />:<Outlet/>}
    
    </div>
  )
}

export default Meeting