import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../state-slice/settings-slice";
import taskReducer from "../state-slice/task-slice";
import profileReducer from "../state-slice/profile-slice";
import searchReducer from "../state-slice/search-slice";

export default configureStore({
    reducer: {
        settings: settingsReducer,
        task: taskReducer,
        profile: profileReducer,
        search: searchReducer,
    }
})