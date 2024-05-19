import { configureStore } from '@reduxjs/toolkit';

import appconfigreducer from './slices/appConfigure';
export const store = configureStore({
    reducer:{
        appconfigreducer
    }
})