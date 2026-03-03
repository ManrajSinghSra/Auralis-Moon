import { GenerateAvatar } from "@/Avatar/Avatar"
import { Button } from "@/components/ui/button"
import { setOnOff } from "@/store/slices/agent";
import { useDispatch } from "react-redux"

const AgentsList = ({agents}) => {


   const dispatch=useDispatch();
  return (<> 
     {agents ? agents.map((curr)=>{
        return(
        <div className="bg-blue-200 m-2 p-5  flex justify-between">
            <div className="flex gap-4">
                 <GenerateAvatar seed={curr.name} variant="botttsNeutral" className="h-20 w-20"/>
             <div className="flex flex-col">
                <span className="text-3xl font-bold">{curr.name}</span>
              <h1>{curr.instruction}</h1>
             </div>

            </div>
            <div>
               
            </div>
         </div>)
     }): 
     <div className="flex justify-center items-center flex-col gap-5" >
        <h1 className="text-white text-6xl">Oops...</h1>
        <h1 className="text-white text-6xl">No Agents</h1>
        <Button onClick={()=>dispatch(setOnOff())}>Create One</Button>
     </div>
     }
 



    </>
  )
}

export default AgentsList