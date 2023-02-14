import {createSlice} from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        new: [],
        progress: [],
        completed: [],
        canceled: [],
        taskGroup: [],
        taskCount: [],
        countByGroup: []
    },

    reducers: {
        setNewTask: (state, action)=>{
            state.new = action.payload
        },
        setProgressTask: (state, action)=>{
            state.progress = action.payload
        },
        setCompletedTask: (state, action) => {
            state.completed = action.payload
        },
        setCanceledTask: (state, action) => {
            state.canceled = action.payload;
        },
        setTaskGroup: (state, action) => {
            state.taskGroup = action.payload
        },
        setTaskCount: (state, action) => {
            state.taskCount = action.payload
        },
        setCountByGroup: (state, action) => {
            state.countByGroup = action.payload
        }
    }
});

export const {setNewTask, setProgressTask, setCompletedTask, setCanceledTask, setTaskGroup, setTaskCount, setCountByGroup} = taskSlice.actions
export default taskSlice.reducer;
