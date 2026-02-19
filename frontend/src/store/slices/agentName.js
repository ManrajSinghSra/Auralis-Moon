import { createSlice } from "@reduxjs/toolkit";


const initialState={
    agentName:""
}
const agentName=createSlice({
    name:"agentName",
    initialState,
    reducers:{
        setAgentName(state,action){
            state.agentName=action.payload
        }
    }
})

export default agentName.reducer

export const {setAgentName}=agentName.actions

