import axios from 'axios';

const BASE_URL = 'https://65658a50eb8bb4b70ef1c04b.mockapi.io/api/Todo';

export const fetchTodos = async() => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const addTodo = async(newTodo) => {
    const response = await axios.post(BASE_URL, newTodo);
    return response.data;
};

export const removeTodo = async(id) => {
    await axios.delete(`${BASE_URL}/${id}`);
};