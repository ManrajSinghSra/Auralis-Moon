import { GenerateAvatar } from "@/Avatar/Avatar"
import { Button } from "@/components/ui/button"
import { setOnOff } from "@/store/slices/agent"; 
import { useDispatch } from "react-redux"
import AgentED from "./EditAndDelete/AgentED"; 
import { URL } from "@/CONST";

const AgentsList = ({agents,setAgents}) => {
   const dispatch=useDispatch(); 

   const onEdit=(curr)=>{
      console.log("edited",curr);

   }
   const onDelete=async(curr)=>{ 
      const deleteResponse=await fetch(`${URL}/agent/delete`,{
         method:"POST",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify({currId:curr._id}),
         credentials:"include"
      })

      const res=await deleteResponse.json(); 
      
      if(deleteResponse.status==200 && res.success==true){
         setAgents((pre)=>({
            ...pre,
            data:pre.data.filter(a=>a._id!=curr._id)
         }))
      } 
   }
 
   
  return (<> 
     {agents.length!=0 ? agents.map((curr)=>{
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
                <AgentED onEdit={()=>onEdit(curr)} onDelete={()=>onDelete(curr)}  />
            </div>
         </div>)
     }): 
     <div className="flex justify-center items-center flex-col gap-5" >
        <h1 className="text-gray-700 text-6xl">Oops...</h1>
        <h1 className="text-gray-700 text-6xl">No Agents</h1>
        <Button className="mt-10" onClick={()=>dispatch(setOnOff())}>Create One</Button>
     </div>
     }
    </>
  )
}

export default AgentsList