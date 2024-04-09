import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { WebSocketProvider } from '../../components/utility/WebSocketContext';


const RootLayout = () => {
  return (
    <WebSocketProvider>
      <Tabs>
        <Tabs.Screen name="chats" options={{
          headerShown: false
        }}/>
        <Tabs.Screen name="pair" options={{
          headerShown: false
        }}/>
        <Tabs.Screen name="profile" options={{
          headerShown: false,
          // tabBarShowLabel: false,
          tabBarIcon: () => (<FontAwesome5 name="user-circle" size={24} color="black" />)
        }}/>
      </Tabs>
    </WebSocketProvider>
  )
}

export default RootLayout