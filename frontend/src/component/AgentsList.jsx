import { GenerateAvatar } from "@/Avatar/Avatar"
import { Button } from "@/components/ui/button"

const AgentsList = ({agents,open,setOpen}) => {
  return (<> 
     {agents ? agents.map((curr)=>{
        return(
        <div className="bg-blue-200 m-2 p-5 rounded-2xl">
            <div className="flex gap-4">
                 <GenerateAvatar seed={curr.name} variant="botttsNeutral" className="h-20 w-20"/>
             <div className="flex flex-col">
                <span className="text-3xl font-bold">{curr.name}</span>
              <h1>{curr.instruction}</h1>
             </div>
            </div>

         </div>)
     }): 
     <div className="flex justify-center items-center flex-col gap-5" >
        <h1 className="text-white text-6xl">Oops...</h1>
        <h1 className="text-white text-6xl">No Agents</h1>
        <Button onClick={()=>setOpen(!open)}>Create One</Button>
     </div>
     }
 



    </>
  )
}

export default AgentsList