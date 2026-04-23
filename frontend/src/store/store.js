import {configureStore} from "@reduxjs/toolkit"

import agentSlice from './slices/agent'
import meetingNameSlice from './slices/meetingName.js'
import userSlice from "./slices/user"
import agentName from "./slices/agentName"



export const store=configureStore(
    {
        reducer:
        {
            agent:agentSlice,
            meetingName:meetingNameSlice,
            user:userSlice,
            agentName:agentName
}})
 