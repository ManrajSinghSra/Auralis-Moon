import { BotIcon, VideoIcon } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import User from "./User"
import { Link } from "react-router-dom"

const DashBoard = ({user}) => {

    const items = [
        {
            title: "Meeting",
            url: "/meeting",
            icon: VideoIcon,
        },
        {
            title: "Agents",
            url: "/agents",
            icon: BotIcon
        }
    ]
    return (
        <>

        <Sidebar>

            <SidebarHeader>
                <div className="flex gap-4">
                    <img src="../../logo.svg" alt="" className="w-10 h-10" />
                    <h1 className="text-3xl font-extrabold">Auralis</h1>
                </div>
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupContent>

                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                        
                    </SidebarGroupContent>

                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <User user={user} />
                    </SidebarMenuItem>
                </SidebarMenu >
            </SidebarFooter>

        </Sidebar>
        </>
    )
}

export default DashBoard