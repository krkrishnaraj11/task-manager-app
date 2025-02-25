import {createAsyncThunk} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ApiList} from "../../../config/apiList";
import api from "../../../config/api";


export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post(ApiList.auth.login, credentials);
            const { token, user } = response.data;
            await AsyncStorage.setItem('token', token);
            return { user, token };
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data || 'Login Failed');
        }
    }
);

export const signupUser = createAsyncThunk (
    'auth/signup',
    async (userData, {rejectWithValue }) => {
        try {
            const response  = await api.post(ApiList.auth.signup, userData);
            const { token, user } = response.data;
            await AsyncStorage.setItem('token', token);
            return { user, token };
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Signup Failed');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async () => {
        await AsyncStorage.removeItem('token');
        return null;
    }
);

export const setToken = (token) => async (dispatch) => {
    try {
      await AsyncStorage.setItem('token', token); // Save token to AsyncStorage
      dispatch({
        type: 'auth/setToken',
        payload: token,
      });
    } catch (error) {
      console.error("Error saving token to AsyncStorage", error);
    }
};

export const resetPasswordRequest = createAsyncThunk(
    'auth/reset-password-request',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post(ApiList.auth.reset_password_request, userData);
            const { message } = response.data;
            return message;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Reset Request Failed');
        }
    }
)