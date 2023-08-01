import {post,get} from "@/api/config";

export function addTemplate(data){
    return post(data,'/template/add')
}

export function deleteTemplate(data){
    return get(data,'/template/delete')
}

export function getTemplateList(data){
    return get(data,'/template/list')
}
export function shareTemplate(data){
    return post(data,'/template/share')
}
export function updateTemplate(data){
    return post(data,'/template/update')
}
