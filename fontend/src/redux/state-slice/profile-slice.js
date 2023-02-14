import {createSlice} from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        value: []
    },

    reducers: {
        setProfile: (state, action) => {
            state.value = action.payload
        }
    }
});

export const {setProfile} = profileSlice.actions;
export default profileSlice.reducer;