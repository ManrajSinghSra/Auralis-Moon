import {createSlice} from "@reduxjs/toolkit"
const initialState={
    open:false
}

export const agentSlice=createSlice({
    name:"agent",
    initialState,
    reducers:{
        setOnOff:(state)=>{
            state.open=!state.open
        }
    }
})



export const {setOnOff}=agentSlice.actions
export default agentSlice.reducer