import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosClient} from'../../pages/utils/axiosCilent';
export const getmyinformation = createAsyncThunk('/user/getmyinformatio',async(body,thunkAPI)=>{
        try {
            thunkAPI.dispatch(setloading(true));
            const response = await axiosClient.get('/user/getmyinformation');
            // console.log("data from api",response.result);
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }finally{
            thunkAPI.dispatch(setloading(false));
        }
})
export const updateprofile = createAsyncThunk('/user/updatemyprofile',async(body,thunkAPI)=>{
    try {
        thunkAPI.dispatch(setloading(true));
        const response = await axiosClient.put('/user/upadtemyprofile');
        // console.log("data from updateprofile api",response.result);
        return response.result;
    } catch (error) {
        return Promise.reject(error)
    }finally{
        thunkAPI.dispatch(setloading(false));
    }
})
export const appConfigSlice = createSlice({
    name :'appConfigSlice',
    initialState:{
        isloading : false,
        myProfile : null,
    },
    reducers:{
        setloading : (state,action)=>{
            state.isloading = action.payload;
        }
    },
    extraReducers : (builder)=>{
        builder.
        addCase(getmyinformation.fulfilled,(state,action)=>{
            state.myProfile = action.payload.user
        }).
        addCase(updateprofile.fulfilled,(state,action)=>{
            state.myProfile = action.payload.user
        })
    }
})
export const {setloading} = appConfigSlice.actions;
export default appConfigSlice.reducer;