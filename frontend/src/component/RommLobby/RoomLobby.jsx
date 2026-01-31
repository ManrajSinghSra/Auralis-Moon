import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const RommLobby = () => { 
        const meetId=useSelector((store)=>store.meetingName.meetId);

        console.log(meetId);
        
         const nav = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-2">
          Ready to join?
        </h2>

        <p className="text-gray-500 mb-6">
          Meeting ID: <span className="font-medium text-gray-700">{meetId}</span>
        </p>

        <button
          onClick={() => nav(`/room`)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
};
