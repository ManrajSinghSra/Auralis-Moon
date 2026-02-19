import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { URL } from "@/CONST";
import { useNavigate } from "react-router-dom";  

export const Room = () => {

  const user = useSelector((state) => state.user);
  console.log("USER",user);
  
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null); 
  const nav=useNavigate() 

  const avatarImage = `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`;


  const CallWatcher = ({ nav }) => {

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  useEffect(() => {
    if (callingState === "left") {
      nav("/meeting/meetingRoom");
    }
  }, [callingState]);

  return null;
};
  useEffect(() => {
  if (!user?.userId) return;

  const apiKey = "g3y2qrem8jkm";

  const initStream = async () => {
    try {
      const res = await fetch(`${URL}/stream/generate-token`, {
        credentials: "include",
        method:"POST"
      });

      const data = await res.json();
      const fetchedToken = data.token;

      if (!fetchedToken) return;

      const newClient = new StreamVideoClient({
        apiKey,
        user: { 
            id: user.userId,
            image:avatarImage
              },
        token: fetchedToken,
      });

      const newCall = newClient.call("default", "my-first-call");
      await newCall.join({ create: true });

      setClient(newClient);
      setCall(newCall);

    } catch (err) {
      console.error(err);
    }
  };

  initStream();

}, [user]);


  if (!client || !call) return null;

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>

        {/* theme */}
          <StreamTheme classID="bg-gray-900">
                <CallWatcher nav={nav} />
                <SpeakerLayout />
                <CallControls />
          </StreamTheme>

        
      </StreamCall>
    </StreamVideo>
  );
};
