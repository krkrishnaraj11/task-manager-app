import {createSlice} from "@reduxjs/toolkit";
import {loginUser, logoutUser, signupUser, resetPasswordRequest} from "./authApi";

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        })
        .addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signupUser.fulfilled, (state, action) => {
            state.loading  = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.error = null;
            state.token = null;
            state.loading = false;
        })
        .addCase(resetPasswordRequest.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(resetPasswordRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(resetPasswordRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        })
    }
})

export default AuthSlice.reducer;