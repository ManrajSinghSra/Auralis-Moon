import "@stream-io/video-react-sdk/dist/css/styles.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Meeting from "./pages/Meeting";
import Agent from "./pages/Agent";

 import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import { store } from "./store/store";
import MeetingPage from "./pages/MeetingPage";
import {Room} from "./component/RommLobby/Room";
import { RommLobby } from "./component/RommLobby/RoomLobby";

const App = () => {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <div><Home /></div>,
      children: [
        {
          path: "meeting",
          element: <Meeting />,
          children:[
            {
              path:"meetingRoom",
              element:<MeetingPage/>
            }
          ]
        },
        {
          path:"agents",
          element: <Agent/>
        }
      ]
    },
    {
      path: "/login",
      element: <div><Login /></div>
    },
     
    { element:<Room/>,
      path:"room"
    },
    {
      element:<RommLobby/>,
      path:"roomLobby"
    }
  ]);

  return (

    <div>
      <Provider store={store}>

      <ToastContainer />
      <RouterProvider router={router}>

      </RouterProvider>
      </Provider>
    </div>
  )
}

export default App