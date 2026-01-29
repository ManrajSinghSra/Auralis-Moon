import {configureStore} from "@reduxjs/toolkit"

import agentSlice from './slices/agent' 

export const store=configureStore({reducer:{agent:agentSlice}})
 