import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Colors } from '../../constants/Colors';
import { useNavigation } from 'expo-router';

export default function Create() {
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const addTodo = async () => {
        const newTodo = { id: uuidv4(), text };
        const storedTodos = await AsyncStorage.getItem('todos');
        const todos = storedTodos ? JSON.parse(storedTodos) : [];
        todos.push(newTodo);
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
        setText('');
        Alert.alert("Success", "Todo added successfully!");
        navigation.goBack({
            params: { newTodoAdded: true },
            merge: true,
        });
    };
    return (
        <View style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginVertical: 'auto' }}>
            <Text style={{ fontSize: 22, fontFamily: 'outfit-bold', textAlign: 'center', marginBottom: 30 }}>Add New Todo</Text>
            <TextInput
                style={{ padding: 10, borderWidth: 1, borderColor: Colors.PRIMARY, width: '100%', borderRadius: 5, textAlignVertical: 'top' }}
                placeholder="Enter Todo"
                value={text}
                onChangeText={setText}
                selectionColor={Colors.PRIMARY}
                multiline
                numberOfLines={4}
            />
            <TouchableOpacity onPress={addTodo} style={{ padding: 10, backgroundColor: Colors.PRIMARY, marginTop: 20, width: '100%', borderRadius: 5 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Add</Text>
            </TouchableOpacity>
        </View>
    )
}