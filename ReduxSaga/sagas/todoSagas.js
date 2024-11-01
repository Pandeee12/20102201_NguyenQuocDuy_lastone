// todoSagas.js
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_TODOS, ADD_TODO, setTodos, addTodo, REMOVE_TODO, removeTodo } from '../actions/todoActions';

function* fetchTodosSaga() {
    try {
        const response = yield call(axios.get, 'https://65658a50eb8bb4b70ef1c04b.mockapi.io/api/Todo');
        yield put(setTodos(response.data));
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

function* handleAddLion(action) {
    try {
        const response = yield call(axios.post, 'https://65658a50eb8bb4b70ef1c04b.mockapi.io/api/Todo', { title: action.payload });
        yield put(addTodo(response.data));
    } catch (error) {
        console.error('Error adding lion:', error);
    }
}

function* handleRemoveLion(action) {
    try {
        yield call(axios.delete, `https://65658a50eb8bb4b70ef1c04b.mockapi.io/api/Todo/${action.payload}`);
        yield put(removeTodo(action.payload));
    } catch (error) {
        console.error('Error removing lion:', error);
    }
}

export function* watchFetchTodos() {
    yield takeEvery(FETCH_TODOS, fetchTodosSaga);
}

export function* watchAddTodo() {
    yield takeEvery(ADD_TODO, handleAddLion);
}

export function* watchRemoveTodo() {
    yield takeEvery(REMOVE_TODO, handleRemoveLion);
}