import { configureStore } from '@reduxjs/toolkit';
import appconfigreducer from './slices/appConfigure';
import postConfigreducer from './slices/postConfigure';
import  feedConfigreducer from './slices/feedConfigure';
export const store = configureStore({
    reducer:{
        appconfigreducer,
        postConfigreducer,
        feedConfigreducer,
    }
})