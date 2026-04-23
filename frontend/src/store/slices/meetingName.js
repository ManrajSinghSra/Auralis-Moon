import {createSlice} from "@reduxjs/toolkit"
const initialState={
    name:"",
    meetId:""
}
const meetingNameSlice=createSlice({
    name:"meetingName",
    initialState,
    reducers:{
        setMeetingName:(state,action)=>{
        state.name=action.payload
    },
        setMeetingId:(state,action)=>{
        state.meetId=action.payload
    }}
})

export default meetingNameSlice.reducer

export const {setMeetingName,setMeetingId}=meetingNameSlice.actions