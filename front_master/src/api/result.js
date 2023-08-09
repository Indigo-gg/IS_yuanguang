// 引入封装的请求模块
import { post, get } from '@/api/config'
export function addFile(data){
    return post(data,'/es/add-one')
}
export function deleteFile(data){
    return get(data,'/es/delete')
}
export function findFileById(data){
    return get(data,'/es/find')
}
export function findFile(data){
    return get(data,'/es/search')
}
export function findFileByTenant(data){
    return get(data,'/es/find-tenant')
}
export function findFileByType(data){
    return get(data,'/es/search-type')
}
export function findFileBySite(data){
    return get(data,'/es/search-website')
}

