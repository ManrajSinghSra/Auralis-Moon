import { AgentDialog } from '@/component/AgentDialog';
import AgentsList from '@/component/AgentsList';
import { LoadingAgent } from '@/component/LoadingAgent';
import Paging from '@/component/Paging';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { PAGE_SIZE, URL } from '@/CONST';
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Agent = () => {

    const [open,setOpen]=useState(false);

    const [agents,setAgents]=useState([]);
    const [loading,setLoading]=useState(true);

    const [totalPage,setTotalPage]=useState(0)

    const [page,setPage]=useState(1)

    useEffect(()=>{
      const getAllAgents=async()=>{
        const res=await fetch(`${URL}/agent/allAgent?page=${page}&limit=${PAGE_SIZE}`,{credentials:"include"});
        const data=await res.json();
        setAgents(data)
        console.log(data);

        setTotalPage(Math.ceil(data.totalCount/PAGE_SIZE))
        
        setLoading(false);
      }
      getAllAgents()
    },[page])
    

  return (
    <div className='mt-3 mx-3'>
        <div className='flex justify-between'>
            <h1 className='text-4xl font-extrabold' >My Agents</h1>
            <Button className="bg-blue-950" onClick={()=>setOpen(!open)}><Plus />  New Agent</Button>
        </div>
        <div>
            <Input className="max-w-[50%] mt-4" placeholder="Search Agent"/>
        </div>
        <AgentDialog open={open} setOpen={setOpen}/>
                 {/* h-140 */}
        <div className='mt-10 h-140  bg-blue-300 rounded-3xl pt-3'> 
             {loading?<LoadingAgent />: (<AgentsList open={open} setOpen={setOpen} agents={agents.data}/>)}
        </div>
        {!loading &&  <Paging agents={agents.data} page={page} setPage={setPage} totalPage={totalPage}/>}

    </div>
  )
}

export default Agent

