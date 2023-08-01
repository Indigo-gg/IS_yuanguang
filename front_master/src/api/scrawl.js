// 引入封装的请求模块
import { post, get } from '@/api/config';

// 添加任务
function addTask(taskInfo) {
    return post(taskInfo, '/scrawl/add');
}

// 暂停任务
function pauseTask(taskId) {
    return post({id: taskId}, '/scrawl/pause');
}

// 恢复任务
function resumeTask(taskId) {
    return post({id: taskId}, '/scrawl/resume');
}

// 取消任务
function cancelTask(taskId) {
    return post({id: taskId}, '/scrawl/cancel');
}

// 获取所有任务
function getAllTasks() {
    return get('/scrawl/all');
}

// 获取运行中任务
function getRunningTasks() {
    return get('/scrawl/running');
}

// 获取等待中任务
function getWaitingTasks() {
    return get('/scrawl/waiting');
}

// 获取请求头配置
function getRequestHeaders() {
    return get('/scrawl/headers');
}

export {
    addTask,
    pauseTask,
    resumeTask,
    cancelTask,
    getAllTasks,
    getRunningTasks,
    getWaitingTasks,
    getRequestHeaders
}