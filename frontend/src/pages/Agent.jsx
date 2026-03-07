import { AgentDialog } from '@/component/AgentDialog';
import AgentsList from '@/component/AgentsList';
import { LoadingAgent } from '@/component/LoadingAgent';
import Paging from '@/component/Paging';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { PAGE_SIZE, URL } from '@/CONST';
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOnOff } from '@/store/slices/agent';

const Agent = () => {

    const store=useSelector((state)=>state.agent.open)
    const open=store
    const dispatch=useDispatch()
 

    const [agents,setAgents]=useState([]);
    const [loading,setLoading]=useState(true);
    const [totalPage,setTotalPage]=useState(0)
    const [page,setPage]=useState(1)


    useEffect(()=>{
      const getAllAgents=async()=>{
        const res=await fetch(`${URL}/agent/allAgent?page=${page}&limit=${PAGE_SIZE}`,{credentials:"include"});
        const data=await res.json();
        setAgents(data)
        setTotalPage(Math.ceil(data.totalCount/PAGE_SIZE))
        setLoading(false);
      }
      getAllAgents()
    },[page,open])
    

  return (
    <div className='mt-3 mx-3'>
        <div className='flex justify-between'>
            <h1 className='text-4xl font-extrabold' >My Agents</h1>
            <Button className="bg-blue-950" onClick={()=>dispatch(setOnOff())}><Plus />  New Agent</Button>
        </div>
        <div>
            <Input className="max-w-[50%] mt-4" placeholder="Search Agent"/>
        </div>
        <AgentDialog open={open} />
        
        <div className='mt-10 h-150  bg-blue-500  py-6 overflow-auto'> 
             {loading?<LoadingAgent />: (<AgentsList open={open}   agents={agents.data} setAgents={setAgents}/>)}
        </div>
        { (!loading && agents.data.length!=0) &&  <Paging agents={agents.data} page={page} setPage={setPage} totalPage={totalPage}/>}

    </div>
  )
}

export default Agent

