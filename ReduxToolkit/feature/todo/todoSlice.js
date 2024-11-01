import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as todoApi from '../../api/todoApi';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async() => {
    return await todoApi.fetchTodos();
});

export const addTodo = createAsyncThunk('todos/addTodo', async(title) => {
    return await todoApi.addTodo({ title });
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async(id) => {
    await todoApi.removeTodo(id);
    return id;
});

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            });
    },
});

export default todoSlice.reducer;