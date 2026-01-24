import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react" 

import { Alert, AlertTitle } from "@/components/ui/alert"
import { OctagonAlertIcon } from "lucide-react" 
import { useNavigate } from "react-router-dom"
import { URL } from "@/CONST"

const Login = () => {

    const [user,setUser]=useState({email:"johnmiller@gmail.com",password:"123456"});

    const [error ,setError]=useState({error:false,text:""});

    const navigate = useNavigate();


    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!user.email || !user.password){ 
            setError({error:true,text:"Please fill the details"})
            return;
        }
        const res=await fetch(`${URL}/user/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(user)
        })
        const data=await res.json()
        if(res.status==200){
               navigate("/")
        }
        else if(res.status==400){
            setError({error:true,text:data.error})
        } 
    
    }

    

    return (

        <div className="flex justify-center items-center mt-50">
            <Card className="w-100 p-10 flex flex-col items-center justify-between">
                <CardContent className="flex flex-col gap-6">


                    <div className="h-[3rem] w-[20rem] flex justify-center items-center flex-col">
                        <img src="./logo.svg" alt="logo" />
                        <h1 className="text-3xl">Auralis</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-10">

                        <div className="flex flex-col gap-4">
                            <Input placeholder="Email" name="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} />
                            <Input placeholder="Password" type="password" name="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}  />
                        </div>

                        <div>
                            <Button className="w-full" type="submit">Submit</Button>
                        </div>

                    </form>

                    <div>
                        {error.error && 
                            <Alert className="bg-destructive/15">
                               <OctagonAlertIcon className="h-6 w-6 text-destructive" />
                               <AlertTitle>{error.text}</AlertTitle>
                            </Alert>
                            }
                    </div>

                    <div className="flex  justify-between text-[#9396a2]">
                        <p>Forgot Password?</p>
                        <p>Sign Up</p>
                    </div>

                    <div>
                        <h1 className="text-center text-[#9396a2]">or you can sign in with</h1>

                        <div className="flex gap-10 justify-center mt-10 ">
                            <Button>Google</Button>
                            <Button>GitHub</Button>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Login