import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosClient} from'../../pages/utils/axiosCilent';
import { likeandunlikepost } from "./postConfigure";
export const getfeedData = createAsyncThunk('user/getfeedData',async()=>{
        try {
           
            const response = await axiosClient.get('/user/getfeedData');
            // console.log("response from getfeddddata api",response.result);
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }
})

export const followunfollow = createAsyncThunk('user/follow',async(body)=>{
    try {
       
        const response = await axiosClient.post('/user/follow',body);
        // console.log("response from flolwandunfolloe api",response.result);
        return response.result.user;
    } catch (error) {
        return Promise.reject(error);
    }
})

export const feedConfigSlice = createSlice({
    name :'feedConfigSlice',
    initialState:{
        feedProfile : {} ,
    },
   extraReducers : (builder)=>{
        builder.
        addCase(getfeedData.fulfilled,(state,action)=>{
            state.feedProfile = action.payload
        })
        .addCase(likeandunlikepost.fulfilled,(state,action)=>{
            const post = action.payload;
            const index = state?.feedProfile?.posts?.findIndex((item) => item._id === post._id)
            
            // console.log("index is",post,index);
            if (index != undefined && index != -1) {
                state.feedProfile.posts[index] = post;
            }
            
        })
        .addCase(followunfollow.fulfilled, (state, action) => {
            const user = action.payload;
            const index = state?.feedProfile?.followings.findIndex((item) => item._id == user._id);
            if(index != -1) {
                state?.feedProfile.followings.splice(index, 1);
            } else {
                state?.feedProfile.followings.push(user);
            }
        })
        
        
    }
})

export default feedConfigSlice.reducer;