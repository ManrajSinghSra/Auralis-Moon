import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    ChevronDown
} from "lucide-react"

export function MeetingStatusDropDown() {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button variant="outline">Status <ChevronDown /></Button>
      </DropdownMenuTrigger> 
      <DropdownMenuContent>
        <DropdownMenuItem>
          Upcoming
        </DropdownMenuItem>
        <DropdownMenuItem>
           Completed
        </DropdownMenuItem>
        <DropdownMenuItem>
          
          Processing
        </DropdownMenuItem> 
        <DropdownMenuItem>
          
          Finished
        </DropdownMenuItem> 
        <DropdownMenuItem>
          
          Cancelled
        </DropdownMenuItem> 

        
         
      </DropdownMenuContent>

    </DropdownMenu>
  )
}
