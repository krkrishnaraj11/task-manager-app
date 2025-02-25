import {createSlice} from "@reduxjs/toolkit";
import {createTask, deleteTask, fetchTaskById, fetchTasks, updateTask} from "./taskApi";

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        selectedTask: null,
        loading: false,
        updated: true,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTaskById.pending, (state) => {
            state.loading = true;
            state.selectedTask = null;
        })
        .addCase(fetchTaskById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedTask = action.payload;
        })
        .addCase(fetchTaskById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchTasks.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createTask.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks.push(action.payload);
            state.error = null;
        })
        .addCase(createTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            const index = state.tasks.findIndex((task) => task._id === action.payload._id);
            if (index !== -1) state.tasks[index] = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(updateTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        })
        .addCase(deleteTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = state.tasks.filter(( task ) => task?._id !== action.payload );
            state.error = null;
        })
        .addCase(deleteTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default taskSlice.reducer;