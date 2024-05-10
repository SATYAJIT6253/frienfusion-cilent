import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosClient} from'../../pages/utils/axiosCilent';
export const getmyinformation = createAsyncThunk('/user/getmyinformatio',async(body,thunkAPI)=>{
        try {
            thunkAPI.dispatch(setloading(true));
            const result = await axiosClient.get('/user/getmyinformation');
            console.log("data from api",result);
        } catch (error) {
            return Promise.reject(error)
        }finally{
            thunkAPI.dispatch(setloading(false));
        }
})
export const appConfigSlice = createSlice({
    name :'appConfigSlice',
    initialState:{
        isloading : false
    },
    reducers:{
        setloading : (state,action)=>{
            state.isloading = action.payload;
        }
    }
})
export const {setloading} = appConfigSlice.actions;
export default appConfigSlice.reducer;