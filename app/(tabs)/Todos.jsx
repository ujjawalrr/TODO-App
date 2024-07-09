import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import { useIsFocused } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
export default function Todos() {
  const [todos, setTodos] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const getTodos = async () => {
    setLoading(true);
    const storedTodos = await AsyncStorage.getItem('todos');
    setTodos(storedTodos ? JSON.parse(storedTodos) : []);
    setLoading(false);
  }
  const deleteTodo = (id) => async () => {
    const storedTodos = await AsyncStorage.getItem('todos');
    const todos = storedTodos ? JSON.parse(storedTodos) : [];
    const newTodos = todos.filter(todo => todo.id !== id);
    await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(todos.filter(todo => todo.id !== id));
    Alert.alert("Success", "Todo deleted successfully!");
  }
  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (isFocused) {
      getTodos();
    }
  }, [isFocused]);
  const editTodo = (id) => {
    router.push('/edittodo/' + id );
  }
  return (
    <View style={{ padding: 20, paddingTop: 60 }}>
      <Text style={{ fontSize: 22, fontFamily: 'outfit-bold', textAlign: 'center' }}>Todos</Text>
      {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} />}
      {!loading && todos.length === 0 &&
        <Text style={{ fontSize: 18, fontFamily: 'outfit', textAlign: 'center', marginTop: 20 }}>No Todo found</Text>
      }
      {!loading &&
        <FlatList style={{ minHeight: 600 }} refreshing={loading} onRefresh={getTodos} data={todos} renderItem={({ item }) =>
          <View key={item.id} style={{ display: 'flex', gap: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ padding: 10, flex: 1, borderWidth: 1, borderColor: '#ccc', backgroundColor: Colors.SECONDARY, borderRadius: 5, marginVertical: 8 }}>
              <Text style={{ fontSize: 18, fontFamily: 'outfit' }}>{item.text}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
              <FontAwesome onPress={() => editTodo(item.id)} name="edit" size={28} color={Colors.PRIMARY} />
              <MaterialIcons onPress={deleteTodo(item.id)} name="delete" size={28} color="red" />
            </View>
          </View>
        } />
      }
    </View>
  )
}