import { Button, GenerateAvatar } from '@/imports/MeetingDialog'
import { CornerDownRight } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMeetingId, setMeetingName } from '@/store/slices/meetingName';  
import { setAgentId, setAgentName } from '@/store/slices/agentName';

import {URL} from "../CONST"
const MeetingList = ({meeting}) => {

  const nav=useNavigate();


  const dispatch=useDispatch()
  return (
    <div className='mt-10'> 

      {meeting.length!=0 ? 
      meeting.map((curr)=>{  
        
        const agentName=curr.agentId;
        const agent=(agentName.name);
 
         
        return(<>
                <div key={curr.title} className="bg-blue-300 m-2 p-5 rounded-2xl flex justify-between">
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
      <div>
        No Meeing Found
      </div>
      }
      {/* Paging */}
    </div>
  )
}

export default MeetingList