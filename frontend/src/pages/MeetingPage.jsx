import { Card } from '@/components/ui/card';
import { Button } from '@/imports/MeetingDialog';
import { Ban, Loader } from 'lucide-react';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';

const MeetingPage = () => {
 
  const nav = useNavigate()

  const openMeeting = () => { 
    nav("/roomLobby")

  }

  return (<>
    <Card className="mt-4">
      <div className='h-[50vh] flex flex-col justify-center items-center rounded-3xl'>
        <h1 className='text-4xl font-extrabold'>Not Started Yet</h1>
        <h1 className='text-2xl text-gray-500'>Once you started the meeting, a summary will appear here.</h1>

        <div className='mt-10 flex gap-3'>
          <Button onClick={()=>nav("/meeting")}> <Ban /> Cancel Meeting</Button>
          <Button className="bg-blue-900" onClick={openMeeting} > <Loader className='animate-spin' />Start Meeting</Button>
        </div>
      </div>
    </Card>

    <Outlet />



  </>

  )
}

export default MeetingPage