import {get, post} from "@/api/config";

export function esSearch(data){
    return get(data,'/es/search')
}
export function search(data){
    return get(data,'/search')
}
export function searchFileById(data){
    return get(data,'/es/find')
}
export function searchFileByTenant(data){
    return get(data,'/es/find-tenant')
}
export function searchFileByType(data){
    return get(data,'/es/search-type')
}
export function searchFileBySite(data){
    return get(data,'/es/search-website')
}
