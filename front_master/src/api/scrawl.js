// 引入封装的请求模块
import { post } from '@/api/config';

// 添加任务
function addTask(data) {
    return post(data, '/spider/http');
}

// 暂停任务
function pauseTask(data) {
    return post(data, '/spider/pause_task');
}

// 恢复任务
function resumeTask(data) {
    return post(data, '/spider/resume_task');
}

// 取消任务
function cancelTask(data) {
    return post(data, '/spider/cancel_task');
}

// 获取所有任务
function getAllTasks(data) {
    return post(data,'/spider/get_tasks');
}

// 获取运行中任务
function getRunningTasks(data) {
    return post(data,'/spider/get_running_tasks');
}

// 获取等待中任务
function getWaitingTasks(data) {
    return post(data,'/spider/get_waiting_tasks');
}


export {
    addTask,
    pauseTask,
    resumeTask,
    cancelTask,
    getAllTasks,
    getRunningTasks,
    getWaitingTasks
}
