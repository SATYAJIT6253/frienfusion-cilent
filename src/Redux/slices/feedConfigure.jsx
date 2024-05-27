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

export const followunfollowuser = createAsyncThunk('user/followunfollowuser',async(body)=>{
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
        feedData : {} ,
    },
   extraReducers : (builder)=>{
        builder.
        addCase(getfeedData.fulfilled,(state,action)=>{
            state.feedData = action.payload
        })
        .addCase(likeandunlikepost.fulfilled,(state,action)=>{
            const post = action.payload;
            const index = state?.feedData?.posts?.findIndex((item) => item._id === post._id)
            
            // console.log("index is",post,index);
            if (index != undefined && index != -1) {
                state.feedData.posts[index] = post;
            }
            
        })
        .addCase(followunfollowuser.fulfilled, (state, action) => {
            const user = action.payload;
            const index = state?.feedData?.followings.findIndex(item => item._id == user._id);
            if(index != -1) {
                state?.feedData. followings.splice(index, 1);
                state?.feedData.suggestions.push(user);
            } else {
                state?.feedData.followings.push(user);
                state?.feedData.suggestions.splice(index, 1);
            }

        })
        
        
    }
})

export default feedConfigSlice.reducer;