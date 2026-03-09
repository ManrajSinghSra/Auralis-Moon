import { FiLogOut } from "react-icons/fi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronUp } from "lucide-react";
import { GenerateAvatar } from "../Avatar/Avatar";
import { URL } from "@/CONST";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const User = ({user}) => {

    const data=user?.data
    const navigate=useNavigate()

    const handleLogout=async()=>{ 
        
        const res=await fetch(`${URL}/user/logout`,{credentials:"include"});
        const data=await res.json()

        const status=res.status;
        if(status==200){
            toast.success("Logout Successful")
            navigate("/login");
        }
        else{
            toast.error(data?.error);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="border border-foreground w-full p-7 flex">
                    <GenerateAvatar seed={data?.name} variant="adventurer" />
                    <h1>{data?.name}</h1>
                    <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="top" className="w-60">
                <GenerateAvatar seed={data?.name} variant="adventurer" className="h-30 w-30 ml-8" />
                <div className="flex gap-4 p-2">
                    
                    <div>
                        <h1>{data?.name}</h1>
                        <h1 className="text-gray-500">
                            {data?.email}
                        </h1>
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout}>
                    <div className="flex gap-5" >
                        <FiLogOut />
                        <span>Log out</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default User