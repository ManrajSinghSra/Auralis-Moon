import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashBoard from "./DashBoard"
import Navbar from "@/component/Navbar" 
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { URL } from "@/CONST"

const Home = () => {

    const [user,setUser]=useState(null);
     const navigate = useNavigate();

    useEffect(()=>{

        const userData=async()=>{
            const res=await fetch(`${URL}/user/profile`,{credentials:"include"});
            const data=await res.json();

            if(data.error){
                 navigate("/login")
            }
            else navigate("/meeting")
            setUser(data);
        }
        userData()
    },[])

    if(!user){
        navigate("/login")
    }

    return (
        <SidebarProvider>

            <DashBoard user={user} />
            {/* this comes to the side  */}

            <main className="w-full bg-gray-100">

                <SidebarTrigger />
                {/* <Navbar /> */}
                <Outlet />

            </main>
        </SidebarProvider>

    )
}

export default Home