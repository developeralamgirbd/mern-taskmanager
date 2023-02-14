import axios from "axios";
import {errorToast, successToast} from "../helpers/formHelper";
import store from "../redux/store/store";
import {hideLoader, showLoader} from "../redux/state-slice/settings-slice";
import {getToken, removeSession} from "../helpers/sessionHelper";
import {
    setCanceledTask,
    setCompletedTask, setCountByGroup,
    setNewTask,
    setProgressTask, setTaskCount,
    setTaskGroup
} from "../redux/state-slice/task-slice";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const AxiosHeaders = {headers: {'authorization': getToken()}};

export const createTaskRequest = (groupName, title, description, exitGroup) => {
    store.dispatch(showLoader);
    const url =  `${apiBaseUrl}/createTask`;
    const reqBody = {groupName, title, description, exitGroup};

    return axios.post(url, reqBody, AxiosHeaders).then(res => {
        store.dispatch(hideLoader);
        if (res.status === 200){
            console.log(res);
            successToast('Task create successfully');
            return true;
        }
    }).catch(error => {
        if (error.response.status === 400){
            errorToast(error.response.data.error);
            return false;
        }else if(error.response.status === 401) {
            errorToast('Unauthorized');
            removeSession();
        }else {

            errorToast('Server Error Occurred');
            return false
        }

    })

}

export const getTasksByStatus = (statusValue) => {
    store.dispatch(showLoader);

    const status = statusValue.toLowerCase();

    const url = `${apiBaseUrl}/listTaskByStatus/${status}`

        axios.get(`${url}`, AxiosHeaders).then(res => {
            store.dispatch(hideLoader)
            if (status === 'new'){
                store.dispatch(setNewTask(res.data['data']))
            }else if (status === 'progress'){
                store.dispatch(setProgressTask(res.data['data']))
            }else if(status === 'completed'){
                store.dispatch(setCompletedTask(res.data['data']))
            }else if(status === 'canceled'){
                store.dispatch(setCanceledTask(res.data['data']))
            }else {
                errorToast('Something went wrong!')
            }

        }).catch(error => {
            console.log(error);
            store.dispatch(hideLoader);
            if (error.response.status === 401){
                removeSession();
            }else {
                errorToast('Server Error Occurred')
            }
        })


}

export const getTasksByGroup = (groupValue, status) => {
    store.dispatch(showLoader);

    const group = groupValue.toLowerCase();

    const url = `${apiBaseUrl}/listTaskByGroup/${group}/${status}`

        axios.get(`${url}`, AxiosHeaders).then(res => {
            store.dispatch(hideLoader)

            if (status === 'new'){
                store.dispatch(setNewTask(res.data['data']))
            }else if (status === 'progress'){
                store.dispatch(setProgressTask(res.data['data']))
            }else if(status === 'completed'){
                store.dispatch(setCompletedTask(res.data['data']))
            }else if(status === 'canceled'){
                store.dispatch(setCanceledTask(res.data['data']))
            }else {
                errorToast('Something went wrong!')
            }

        }).catch(error => {
            console.log(error);
            store.dispatch(hideLoader);
            if (error.response.status === 401){
                removeSession();
            }else {
                errorToast('Server Error Occurred')
            }
        })


}

export const getTaskGroupByStatus = (statusValue) => {
    store.dispatch(showLoader);

    const status = statusValue.toLowerCase();

    const url = `${apiBaseUrl}/listTaskGroupByStatus/${status}`

    axios.get(`${url}`, AxiosHeaders).then(res => {
        store.dispatch(hideLoader)
        console.log(res.data['data'])
        store.dispatch(setTaskGroup(res.data['data']))
        /*if (status === 'new'){
            store.dispatch(setNewTask(res.data['data']))
        }else if (status === 'progress'){
            store.dispatch(setProgressTask(res.data['data']))
        }else if(status === 'completed'){
            store.dispatch(setCompletedTask(res.data['data']))
        }else if(status === 'canceled'){
            store.dispatch(setCanceledTask(res.data['data']))
        }else {
            errorToast('Something went wrong!')
        }*/


    }).catch(error => {
        console.log(error);
        store.dispatch(hideLoader);
        if (error.response.status === 401){
            removeSession();
        }else {
            errorToast('Server Error Occurred')
        }
    })


}

export const getTaskGroups = () => {
    store.dispatch(showLoader);

    const url = `${apiBaseUrl}/listTaskGroup`

    axios.get(`${url}`, AxiosHeaders).then(res => {
        store.dispatch(hideLoader)
        console.log(res.data['data'])
        store.dispatch(setTaskGroup(res.data['data']))
        /*if (status === 'new'){
            store.dispatch(setNewTask(res.data['data']))
        }else if (status === 'progress'){
            store.dispatch(setProgressTask(res.data['data']))
        }else if(status === 'completed'){
            store.dispatch(setCompletedTask(res.data['data']))
        }else if(status === 'canceled'){
            store.dispatch(setCanceledTask(res.data['data']))
        }else {
            errorToast('Something went wrong!')
        }*/


    }).catch(error => {
        console.log(error);
        store.dispatch(hideLoader);
        if (error.response.status === 401){
            removeSession();
        }else {
            errorToast('Server Error Occurred')
        }
    })


}

export const updateStatus = (id, status) => {
    store.dispatch(showLoader);
    const url = `${apiBaseUrl}/updateTaskStatus/${id}/${status}`;

    return axios.get(url, AxiosHeaders).then(res => {
        store.dispatch(hideLoader);
        if (res.status === 200){
            successToast('Task update successfully')
           return true
        }else {
            errorToast('Server error occurred');
            return false
        }

    }).catch(error => {
        console.log(error);
        store.dispatch(hideLoader);
        if (error.response.status === 401){
            removeSession();
        }else {
            errorToast('Server Error Occurred')
        }
        return false
    })

}

export const deleteTask = (id)=>{
    store.dispatch(showLoader);
    const url = `${apiBaseUrl}/deleteTask/${id}`;

   return axios.get(url, AxiosHeaders).then(res => {
        store.dispatch(hideLoader);
        if (res.status === 200){
            successToast('Task delete successfully');
            return true
        }
    }).catch(error => {
        store.dispatch(hideLoader);
        if (error.response.status === 401){
            removeSession();
        }else {
            errorToast('Server Error Occurred')
        }
        return false
    })
}

export const getTaskCountStatus = ()=>{
    store.dispatch(showLoader);
    const url = `${apiBaseUrl}/taskStatusCount`;

    axios.get(url, AxiosHeaders).then(res => {
        store.dispatch(hideLoader);

       if (res.status === 200){
           store.dispatch(setTaskCount(res.data['data']));
       }

    }).catch(error => {
        store.dispatch(hideLoader);
        if (error.response.status === 401){
            removeSession();
        }else {
            errorToast('Server Error Occurred')
        }
    })
}

export const getTaskCountGroup = ()=>{
    store.dispatch(showLoader);
    const url = `${apiBaseUrl}/task-group-count`;

    axios.get(url, AxiosHeaders).then(res => {
        store.dispatch(hideLoader);

       if (res.status === 200){
           store.dispatch(setCountByGroup(res.data['data']));
       }

    }).catch(error => {
        store.dispatch(hideLoader);
        if (error.response.status === 401){
            removeSession();
        }else {
            errorToast('Server Error Occurred')
        }
    })
}