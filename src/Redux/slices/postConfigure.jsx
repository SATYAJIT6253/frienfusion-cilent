import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosClient} from'../../pages/utils/axiosCilent';
import Profile from "../../componets/profile/Profile";

export const getuserinformation = createAsyncThunk('user/getuserprofile',async(body)=>{
        try {
           
            const response = await axiosClient.post('/user/getuserprofile',body);
            // console.log("response from getuserprofile api",response);
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }
})

export const likeandunlikepost = createAsyncThunk('posts/like',async(body)=>{
    try {
       
        const response = await axiosClient.post('/posts/like',body);
        // console.log("response from likeunlike api",response);
        return response.result.post;
    } catch (error) {
        return Promise.reject(error);
    }
})
export const deletepost = createAsyncThunk('/posts/',async(body)=>{
    try {
       
        const response = await axiosClient.delete('/posts/',body);
        console.log("response from delete api",response);
        return response.result.post;
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
        .addCase(likeandunlikepost.fulfilled,(state,action)=>{
            const post = action.payload;
            const index = state?.userProfile?.posts?.findIndex((item) => item._id === post._id)
           
            // console.log("index is",post,index);
            if (index != undefined && index != -1) {
                state.userProfile.posts[index] = post;
            }
            
        })
        .addCase(deletepost.fulfilled,(state,action)=>{
            state.userProfile = action.payload;
        })
        
    }
})

export default postConfigSlice.reducer;