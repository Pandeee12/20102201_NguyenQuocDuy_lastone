import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, removeTodo } from '../features/todo/todoSlice';

const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.todos);
    const [titleInput, setTitleInput] = useState('');

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAdd = () => {
        if (titleInput.trim()) {
            dispatch(addTodo(titleInput.trim()));
            setTitleInput('');
        } else {
            Alert.alert("Input Error", "Please enter a title");
        }
    };

    const handleRemove = (id) => {
        dispatch(removeTodo(id));
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
        FlatList data = { todos }
        keyExtractor = {
            (item) => item.id.toString() }
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