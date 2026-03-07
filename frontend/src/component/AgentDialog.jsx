import { GenerateAvatar } from "@/Avatar/Avatar"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { URL } from "@/CONST" 
import { useState } from "react"
import { toast } from "react-toastify"


//redux
import { setOnOff } from "@/store/slices/agent"
import { useDispatch } from "react-redux"

export const AgentDialog = ({ open }) => {

    const [agent, setAgent] = useState({ name: "Maskara", instruction: "You are a calm and supportive mental health consultation assistant designed to help psychiatrists gather basic information before a formal consultation. Your role is to listen carefully, ask clear and respectful questions, and help understand the user’s emotional and mental state while maintaining a non-judgmental tone." })

    const dispath=useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
           const res= await fetch(`${URL}/agent/addAgent`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(agent)
           },
        )
        const data=await res.json();

        const status=res.status;

        if(status==200){
            toast.success("Created");
            dispath(setOnOff())

        }
        else if(status==500){
            toast.error(data.error);
        }  

    }
    return (
        <Dialog open={open} onOpenChange={()=>dispath(setOnOff())} >

            <DialogContent className="sm:max-w-[425px]">

                <DialogHeader>
                    <DialogTitle>New Agent</DialogTitle>
                    <DialogDescription>Make a new agent</DialogDescription>
                </DialogHeader>

                <div>
                    <GenerateAvatar
                        seed={agent.name}
                        variant="botttsNeutral"
                        className="w-40 h-50"
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder="eg.. John" value={agent.name} onChange={(e) => setAgent({ ...agent, name: e.target.value })} />
                        </div>
                        <div className="grid gap-3 mb-5">
                            <Label htmlFor="instruction">Instruction</Label>
                            <Textarea id="instruction" name="instruction" value={agent.instruction} onChange={(e) => setAgent({ ...agent, instruction: e.target.value })} />
                        </div>
                    </div>

                    <DialogFooter >
                        <DialogClose asChild>
                            <Button variant="outline" onClick={() => dispath(setOnOff())}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>

            </DialogContent>


        </Dialog>
    )
}