import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userId:"",
    name:""
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.userId=action.payload
        },
        setName:(state,action)=>{
            state.name=action.payload;
        }
    }
})

export default userSlice.reducer
export const {addUser,setName} =userSlice.actions