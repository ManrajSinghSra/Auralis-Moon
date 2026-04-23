import { Button, GenerateAvatar } from '@/imports/MeetingDialog'
import { CalendarClock, CheckCircle, ClockArrowUp, CornerDownRight, Loader, Mic } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMeetingId, setMeetingName } from '@/store/slices/meetingName';  
import { setAgentId, setAgentName } from '@/store/slices/agentName';
 
const MeetingList = ({meeting}) => {

  const statusColor = {
  upcoming: {color:"bg-green-900",icon: CalendarClock},
  active: {color:"bg-blue-900", icon: Mic},
  processing: {color:"bg-blue-950",   icon: Loader},
  completed: {color:"bg-green-950",icon: CheckCircle}
};
   
  const IconDisplay=({status})=>{

     const config = statusColor[status]; 
      const Icon = config.icon;
      const color=config.color;
 

    return <>
      <div className='w-40 flex-1 pt-4'>
            <Button className={`${color} text-1xl font-extrabold` }><Icon className={status==="processing" ? "animate-spin":""} /> {status}  </Button>

      </div>
    </>
  }


  const nav=useNavigate();
 
  const dispatch=useDispatch()
  return (
    <div className='mt-10 bg-blue-500 pt-2 h-150'> 

      {meeting.length!=0 ? 
      meeting.map((curr)=>{   

        const date=new Date(curr?.createdAt);
 
        const formatDate=date?.toDateString();
 
        const agentName=curr?.agentId;
        const agent=(agentName?.name);
 
        return(
        <div key={curr.title}>
                <div  className="bg-blue-300 m-2 px-10 p-5  flex justify-between">
                   <div className='flex-1'>
                     <h1 className='text-3xl font-extrabold' onClick={()=>{                      
                      dispatch(setAgentName(agent))
                      dispatch(setAgentId(agentName._id))
                      dispatch(setMeetingName(curr.title));
                      dispatch(setMeetingId(curr._id)); 

                      nav("/meeting/meetingRoom")}
                      }>{curr.title}</h1>

                     <div className='flex gap-4'> 
                      <CornerDownRight />
                      <h1>{agentName?.name} Coach</h1>
                      <GenerateAvatar seed={agent} variant="botttsNeutral"/>
                      <h1>{formatDate}</h1>
                     </div>

                   </div>
                   <IconDisplay status={curr.status} />

                    <div>
                      Time
                    </div>

                </div>
                </div>

                )
      }):
      <div className='text-gray-100  p-4 font-extrabold text-4xl'>
        No Meeing Found
      </div>
      }
      {/* Paging */}
    </div>
  )
}

export default MeetingList