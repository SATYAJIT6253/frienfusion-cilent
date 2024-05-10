import { configureStore } from '@reduxjs/toolkit';

import {appConfigSlice} from './slices/appConfigure';
export const store = configureStore({
    reducer:{
        appconfigreducer : appConfigSlice.reducer,
    }
})