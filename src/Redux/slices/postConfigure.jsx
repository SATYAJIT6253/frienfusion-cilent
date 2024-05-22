import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosClient} from'../../pages/utils/axiosCilent';
import { setloading } from "./appConfigure";
export const getuserinformation = createAsyncThunk('user/getuserprofile',async(body)=>{
        try {
           
            const response = await axiosClient.post('/user/getuserprofile',body);
            // console.log("response from getuserprofile api",response);
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }
})

export const postConfigSlice = createSlice({
    name :'postConfigSlice',
    initialState:{
    
        userProfile : {} ,
    },
   extraReducers : (builder)=>{
        builder.
        addCase(getuserinformation.fulfilled,(state,action)=>{
            state.userProfile = action.payload
        })
        
    }
})

export default postConfigSlice.reducer;