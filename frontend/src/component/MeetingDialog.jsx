import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AgentDialog } from "./AgentDialog"

import { useDispatch, useSelector } from "react-redux"
import { setOnOff } from "@/store/slices/agent" 
import { useEffect, useState } from "react"
import { URL } from "@/CONST"
import { GenerateAvatar } from "@/Avatar/Avatar"

export function MeetingDialog({ open, setOpen }) {

  const store=useSelector((state)=>state.agent.open)
  const dispath=useDispatch()

  const [newMeeting,setNewMeeting]=useState({title:"THis is a Sci meeting",agent:""})

  const [agents,setAgents]=useState([]);
 
    const handleAgentOpen=()=>{ 
      setOpen(false)
      dispath(setOnOff());
    }
    const handleFormSubmit=(e)=>{
      e.preventDefault()
      console.log(newMeeting);
    }

    useEffect(()=>{
      const fetchData=async()=>{
          const res=await fetch(`${URL}/agent/allAgent`,{credentials:"include"});
          const data=await res.json();
          setAgents(data.data)
      }
      fetchData()
    },[])



  return (<>
    <Dialog open={open} onOpenChange={setOpen}>
      <form >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Meeting</DialogTitle>
            <DialogDescription>
              Make a new Meeting.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">

            <div className="grid gap-3">
              <Label htmlFor="name-1">Title</Label>
              <Input id="name-1" name="title"  value={newMeeting.title} onChange={(e)=>setNewMeeting({...newMeeting,title:e.target.value})}/>
            </div>

            <div className="grid gap-3">
              <Select onValueChange={(value)=>setNewMeeting({...newMeeting,agent:value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select An Agent" />
                </SelectTrigger>

                <SelectContent >
                  <SelectGroup  >
                    <SelectLabel>Select an Agent</SelectLabel> 
                    {agents && agents.map((curr)=>{    
                     return (<>
                      <div className="flex justify-between gap-4 my-4">
                         <GenerateAvatar seed={curr.name} variant="botttsNeutral" />
                         <SelectItem value={curr._id}>{curr.name}</SelectItem> 
                      </div>
                     
                      </>)
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              Not found what you are looking for? <span className="text-blue-600" onClick={()=>handleAgentOpen()}> Create one</span>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleFormSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    <AgentDialog open={store} />
    </>

  )
}
