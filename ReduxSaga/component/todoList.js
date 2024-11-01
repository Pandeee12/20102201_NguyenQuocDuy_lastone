import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchTodos, addTodo, removeTodo } from '../actions/todoActions';

const TodoList = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.todos.todos);
    const [titleInput, setTitleInput] = useState('');

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAdd = async() => {
        if (titleInput.trim()) {
            try {
                const newUser = { title: titleInput.trim() };
                const response = await axios.post('https://65658a50eb8bb4b70ef1c04b.mockapi.io/api/Todo', newUser);
                dispatch(addTodo(response.data)); // Thêm vào Redux store từ dữ liệu phản hồi
                setTitleInput('');
            } catch (error) {
                console.error('Error adding lion:', error);
                Alert.alert("Error", "Unable to add Lion. Please try again.");
            }
        } else {
            Alert.alert("Input Error", "Please enter a title");
        }
    };

    const handleRemove = async(id) => {
        try {
            await axios.delete(`https://65658a50eb8bb4b70ef1c04b.mockapi.io/api/Todo/${id}`);
            dispatch(removeTodo(id)); // Xóa từ Redux store
        } catch (error) {
            console.error('Error removing lion:', error);
            Alert.alert("Error", "Unable to remove Lion. Please try again.");
        }
    };

    return ( <
        View style = {
            { padding: 20 } } >
        <
        TextInput style = {
            { borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 } }
        value = { titleInput }
        onChangeText = { setTitleInput }
        placeholder = "Add Lion Name" /
        >
        <
        Button title = "Add User"
        onPress = { handleAdd }
        /> <
        FlatList data = { users }
        keyExtractor = {
            (item) => item ? .id ? .toString() }
        renderItem = {
            ({ item }) => ( <
                View style = {
                    { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 } } >
                <
                Text > { item.title } < /Text> <
                TouchableOpacity onPress = {
                    () => handleRemove(item.id) }
                style = {
                    { borderWidth: 1, width: '30%', alignItems: 'center' } } >
                <
                Text style = {
                    { color: 'red' } } > Remove < /Text> <
                /TouchableOpacity> <
                /View>
            )
        }
        /> <
        /View>
    );
};

export default TodoList;