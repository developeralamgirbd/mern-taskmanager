import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        task: []
    },

    reducers: {
        setSearchTask: (state, action)=>{
            state.task = action.payload;
        }
    }
});

export const {setSearchTask} = searchSlice.actions;

export default searchSlice.reducer;
