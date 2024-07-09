import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { Colors } from '../../constants/Colors';
import { useLocalSearchParams, useNavigation } from 'expo-router';

export default function EditTodo() {
  const { todoid } = useLocalSearchParams();
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const getTodo = async () => {
    const storedTodos = await AsyncStorage.getItem('todos');
    const todos = storedTodos ? JSON.parse(storedTodos) : [];
    const todo = todos.find(todo => todo.id === todoid);
    setText(todo.text);
  }
  const updateTodo = async () => {
    const storedTodos = await AsyncStorage.getItem('todos');
    const todos = storedTodos ? JSON.parse(storedTodos) : [];
    const newTodos = todos.map(todo => {
      if (todo.id === todoid) {
        return { ...todo, text };
      }
      return todo;
    });
    await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
    setText('');
    navigation.goBack();
  };
  useEffect(() => {
    getTodo();
    navigation.setOptions({ title: 'Update Todo', headerShown: true });
  }, []);
  return (
    <View style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginVertical: 'auto' }}>
      <TextInput
        style={{ padding: 10, borderWidth: 1, borderColor: Colors.PRIMARY, width: '100%', borderRadius: 5, textAlignVertical: 'top' }}
        placeholder="Enter Todo"
        value={text}
        onChangeText={setText}
        selectionColor={Colors.PRIMARY}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity onPress={updateTodo} style={{ padding: 10, backgroundColor: Colors.PRIMARY, marginTop: 20, width: '100%', borderRadius: 5 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Update</Text>
      </TouchableOpacity>
    </View>
  )
}