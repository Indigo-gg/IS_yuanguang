import {get, post} from "@/api/config";

export function esSearch(data){
    return get(data,'/es/search')
}
export function search(data){
    return get(data,'/search')
}
