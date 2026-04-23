import { GenerateAvatar } from "@/Avatar/Avatar";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const RommLobby = () => { 
        const meetId=useSelector((store)=>store.meetingName.meetId);
        const userName=useSelector((store)=>store.user.name)

        const agentName=useSelector((store)=>store.agentName);
 
         const nav = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[50vw]  max-w-md text-center">

        <div>
            <Card className="bg-gray-950 h-60 w-full border-8 border-blue-500">
                <GenerateAvatar seed={userName} variant="adventurer" className="h-full w-full" />
            </Card>
        </div>

        <h2 className="text-2xl font-semibold mb-2">
          Ready to join?
        </h2>
        <p className="text-gray-500 mb-6">
          Meeting ID: <span className="font-medium text-gray-700">{meetId}</span>
        </p>
        <div className="flex gap-3">
               <button
          onClick={() => nav(`/meeting/meetingRoom`)}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Cancel Meeting
        </button>
        <button
          onClick={() => {

              nav(`/room`)
            }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Join Meeting
        </button>
        </div>
      </div>
    </div>
  );
};
