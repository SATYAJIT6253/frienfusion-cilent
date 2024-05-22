import { configureStore } from '@reduxjs/toolkit';
import appconfigreducer from './slices/appConfigure';
import postConfigreducer from './slices/postConfigure';
export const store = configureStore({
    reducer:{
        appconfigreducer,
        postConfigreducer,
    }
})