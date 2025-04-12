import { createSlice } from "@reduxjs/toolkit";
import { extensions as extenciones } from "../utils/extensions";

const extensionSlice = createSlice({
    name:'extensions',
    initialState:{
        extensions:extenciones
    },
    reducers:{
        changeStatus:(state,action) => {
            const extension = state.extensions.find(extension => extension.title === action.payload)
            extension.status = !extension.status;
        },
        remove:(state,action) => {
            state.extensions = state.extensions.filter(extension => extension.title !== action.payload)
        }
    }
})

export const { changeStatus,remove } = extensionSlice.actions

export default extensionSlice.reducer
