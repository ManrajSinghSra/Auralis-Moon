import { Button, GenerateAvatar } from '@/imports/MeetingDialog'
import { CornerDownRight } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMeetingId, setMeetingName } from '@/store/slices/meetingName';

const MeetingList = ({meeting}) => {

  const nav=useNavigate();

  const dispatch=useDispatch()
  return (
    <div className='mt-10'> 

      {meeting.length!=0 ? 
      meeting.map((curr)=>{
        console.log(curr);
        
        const agentName=curr.agentId;
        const agent=(agentName.name);
        dispatch(setMeetingName(curr.title));
        dispatch(setMeetingId(curr._id));
        return(<>
                <div key={curr.title} className="bg-amber-50 m-2 p-5 rounded-2xl flex justify-between">
                   <div>
                     <h1 className='text-3xl font-extrabold' onClick={()=>{nav("/meeting/meetingRoom")}}>{curr.title}</h1>

                     <div className='flex'>
                      {/* <h1 className='text-2xl'>{agent}</h1> */}
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