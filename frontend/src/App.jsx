import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Meeting from "./pages/Meeting";
import Agent from "./pages/Agent";

 import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import { store } from "./store/store";

const App = () => {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <div><Home /></div>,
      children: [
        {
          path: "meeting",
          element: <Meeting />
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