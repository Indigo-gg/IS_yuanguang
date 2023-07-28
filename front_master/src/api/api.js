import {get, post} from "@/api/config";


/******用户模块接口********/
export function login(data) {
    return post(data, '/user/login')
}

export function register(data) {
    return post(data, '/user/register')
}

export function logout() {
    return post({}, '/user/logout')
}

export function deleteUser(id) {
    return post({id:id}, '/user/delete')
}

export function updateUser(data) {
    return post(data, '/user/delete')
}

export function myInfo() {
    return get({}, '/user/current')
}

export function searchUser(data) {
    return get(data, '/user/search')
}

export function getUserList(data){
    return get(data,'user/list')
}

export function updatess(data){
    return post(data,'user/updatess')
}

/**************/
