import { AgentDialog } from "./AgentDialog"
import {useDispatch,
       useSelector,
       setOnOff,
       useEffect, 
       useState,
       URL,
       GenerateAvatar,
       Input,
       Label, 
       Select,
       SelectContent,
       SelectGroup,
       SelectItem,
       SelectLabel,
       SelectTrigger,
       SelectValue,  
       Dialog,
       DialogClose,
       DialogContent,
       DialogDescription,
       DialogFooter,
       DialogHeader,
       DialogTitle,
       Button} from "../imports/MeetingDialog"

export function MeetingDialog({ open, setOpen }) {

  const store=useSelector((state)=>state.agent.open)
  const dispath=useDispatch()

  const [newMeeting,setNewMeeting]=useState({title:"THis is a Sci meeting",agentId:""})
  const [agents,setAgents]=useState([]);
 
    const handleAgentOpen=()=>{ 
      setOpen(false)
      dispath(setOnOff());
    }
    const handleFormSubmit=async(e)=>{
      e.preventDefault()
      console.log(newMeeting);
      const res=await fetch(`${URL}/meeting/add`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({title:newMeeting.title,agentId:newMeeting.agentId}),
        credentials:"include",
      })
      const status=res.status;
      if(status==200){
        console.log("here");
        
        
        setOpen((pre)=>!pre)
      }
      else{
        const data=await res.json()
        console.log(data);
      }
      console.log(status);
      console.log(await res.json());

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
              Create a new Meeting.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">

            <div className="grid gap-3">
              <Label htmlFor="name-1">Title</Label>
              <Input id="name-1" name="title"  value={newMeeting.title} onChange={(e)=>setNewMeeting({...newMeeting,title:e.target.value})}/>
            </div>

            <div className="grid gap-3">
              <Select onValueChange={(value)=>setNewMeeting({...newMeeting,agentId:value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select An Agent" />
                </SelectTrigger>

                <SelectContent >
                  <SelectGroup  >
                    <SelectLabel>Select an Agent</SelectLabel> 
                    {agents && agents.map((curr)=>{    
                     return (<div key={curr._id}>
                      <div className="flex justify-between gap-4 my-4">
                         <GenerateAvatar seed={curr.name} variant="botttsNeutral" />
                         <SelectItem value={curr._id}>{curr.name}</SelectItem> 
                      </div>
                     
                      </div>)
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
