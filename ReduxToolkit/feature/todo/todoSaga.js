import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { setTodos, addTodo, removeTodo } from './todoSlice';

function* fetchTodosSaga() {
    try {
        const response = yield call(axios.get, 'https://65658a50eb8bb4b70ef1c04b.mockapi.io/api/Todo');
        yield put(setTodos(response.data));
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

function* addTodoSaga(action) {
    try {
        const response = yield call(axios.post, 'https://65658a50eb8bb4b70ef1c04b.mockapi.io/api/Todo', {
            title: action.payload,
        });
        yield put(addTodo(response.data));
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

function* removeTodoSaga(action) {
    try {
        yield call(axios.delete, `https://65658a50eb8bb4b70ef1c04b.mockapi.io/api/Todo/${action.payload}`);
        yield put(removeTodo(action.payload));
    } catch (error) {
        console.error('Error removing todo:', error);
    }
}

export default function* todoSaga() {
    yield takeEvery('todos/fetchTodos', fetchTodosSaga);
    yield takeEvery('todos/addTodoSaga', addTodoSaga);
    yield takeEvery('todos/removeTodoSaga', removeTodoSaga);
}