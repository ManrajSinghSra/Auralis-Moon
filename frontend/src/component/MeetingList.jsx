import { Button, GenerateAvatar } from '@/imports/MeetingDialog'
import { CornerDownRight } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMeetingId, setMeetingName } from '@/store/slices/meetingName';  
import { setAgentId, setAgentName } from '@/store/slices/agentName';
 
const MeetingList = ({meeting}) => {

  const nav=useNavigate();
 
  const dispatch=useDispatch()
  return (
    <div className='mt-10 bg-blue-500 pt-2 h-150'> 

      {meeting.length!=0 ? 
      meeting.map((curr)=>{  
        
        const agentName=curr?.agentId;
        const agent=(agentName?.name);
 
         
        return(<>
                <div key={curr.title} className="bg-blue-300 m-2 p-5  flex justify-between">
                   <div>
                     <h1 className='text-3xl font-extrabold' onClick={()=>{                      
                      dispatch(setAgentName(agent))
                      dispatch(setAgentId(agentName._id))
                      dispatch(setMeetingName(curr.title));
                      dispatch(setMeetingId(curr._id)); 

                      nav("/meeting/meetingRoom")}
                      }>{curr.title}</h1>

                     <div className='flex'> 
                      <CornerDownRight />
                      <GenerateAvatar seed={agent} variant="botttsNeutral"/>
                     </div>
                   </div>
                    <Button>{curr.status}</Button>
                </div>
               
                </>

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