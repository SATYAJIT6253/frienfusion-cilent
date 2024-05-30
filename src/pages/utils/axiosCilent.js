// thise code are repeated in next class
import axios from 'axios';
import { getItem, removeItem, setItem } from './localStoragemanager';
import { KEY_ACESS_TOKEN } from './localStoragemanager';

import { setloading, showToast } from '../../Redux/slices/appConfigure';
import { TOAST_FAILURE,TOAST_SUCCESS } from '../../App';
import {store}from '../../Redux/Store.jsx';

export const axiosClient = axios.create({
    baseURL:'https://friendfusion-v925.onrender.com',
    withCredentials:true,
});
let  baseURL = 'https://friendfusion-v925.onrender.com'
axiosClient.interceptors.request.use(
    (request)=>{
        const acesstoken = getItem(KEY_ACESS_TOKEN);
        request.headers['Authorization'] = `Bearer ${acesstoken}`;
        store.dispatch(setloading(true));
        return request;
    }
)

axiosClient.interceptors.response.use(
    async(response)=>{
        store.dispatch(setloading(false));
        const data = response.data;
        // console.log("daa is bata",data);
        if(data.status === 'ok'){
            return data;
        }
        // console.log("response is mini",response);
        const originalrequest = response.config;
        const stausCode = data.statusCode;
        const error = data.message;
        
        store.dispatch(showToast({
            type: TOAST_FAILURE,
            message: error
        }))
        if(stausCode === 401 && !originalrequest._retry){
            originalrequest._retry = true;
            const response = await axios.create({withCredentials :true}).get(`${baseURL}/auth/refersh`);
            // console.log("response from backend",response);
            if(response.status === 'ok'){
                
                setItem(KEY_ACESS_TOKEN,response.result.acesstoken);
                // console.log(response.result.acesstoken);
                originalrequest.headers['Authorization'] = `Bearer ${response.result.acesstoken}`;
                return axios(originalrequest);
            }else{
                removeItem(KEY_ACESS_TOKEN);
                window.location.replace('./login','_self');
                return Promise.reject(error);
            }
             
        }
        return Promise.reject(error)
        
    },async(error) =>{
        store.dispatch(setloading(false));
        store.dispatch(showToast({
            type: TOAST_FAILURE,
            message: error.message
        }))
        return Promise.reject(error)
    }
)