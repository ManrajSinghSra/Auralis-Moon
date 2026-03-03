import { createSlice } from "@reduxjs/toolkit";


const initialState={
    agentName:"",
    agentId:""
}
const agentName=createSlice({
    name:"agentName",
    initialState,
    reducers:{
        setAgentName(state,action){
            state.agentName=action.payload
        },
        setAgentId(state,action){
            state.agentId=action.payload
        }
    }
})

export default agentName.reducer

export const {setAgentName,setAgentId}=agentName.actions

