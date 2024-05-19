export const KEY_ACESS_TOKEN = "acesstoken";

// this function is called  when a person is logged in or not for checking puprpose
export function getItem(key){
    return localStorage.getItem(key);
}
// this function is called when login sucessfull and store the acesstoken
export function setItem(key,value){
    localStorage.setItem(key,value);
}
// this function is called when logout sucessfull and delete the acesstoken
export function removeItem(key){
    localStorage.removeItem(key);
}