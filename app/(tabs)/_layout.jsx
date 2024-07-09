import React from 'react'
import { Tabs } from 'expo-router'
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY
      }}>
        <Tabs.Screen name="Todos"
        options={{
            tabBarLabel: 'Todos',
            tabBarIcon: ({ color }) => <Foundation name="clipboard-notes" size={24} color={color} />
        }}
        />
        <Tabs.Screen name="Create" 
        options={{
            tabBarLabel: 'Add Todo',
            tabBarIcon: ({ color }) => <MaterialIcons name="note-add" size={24} color={color} />
        }}
        />
    </Tabs>
  )
}