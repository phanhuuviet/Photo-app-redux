import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";

export const getMe = createAsyncThunk('user/getme', async (params, thunkAPI) => {
    const currentUser = await userApi.getMe();
    return currentUser;
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: {},
        loading: false,
        error: "",
    },
    reducers: {
        current: {},
    },
    extraReducers: {
        [getMe.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    }
});

const {reducer: userReducer} = userSlice

export default userReducer