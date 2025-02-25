import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../../config/api";
import {ApiList} from "../../../config/apiList";

export const fetchTaskById = createAsyncThunk(
    'tasks/fetchTaskById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(ApiList.task.get_task + `${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data || 'Failed to fetch task');
        }
    }
);

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('/tasks');
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch tasks');
      }
    }
  );

  export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (taskData, { rejectWithValue }) => {
      try {
        console.log("response.data", taskData)

        const response = await api.post('/tasks', taskData);
        console.log(response.data)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to create task');
      }
    }
  );

  export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, updatedData }, { rejectWithValue }) => {
      try {
        const response = await api.put(`/tasks/${id}`, updatedData);
        return response.data;
      } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data || 'Failed to update task');
      }
    }
  );

  export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id, { rejectWithValue }) => {
      try {
        await api.delete(`/tasks/${id}`);
        return id;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to delete task');
      }
    }
  );