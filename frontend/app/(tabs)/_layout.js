import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const RootLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="chats" options={{
        headerShown: false,
        tabBarIcon: () => (<MaterialCommunityIcons name="chat-outline" size={24} color="black" />)
      }}/>
      <Tabs.Screen name="pair" options={{
        headerShown: false
      }}/>
      <Tabs.Screen name="profile" options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: () => (<FontAwesome5 name="user-circle" size={24} color="black" />)
      }}/>
    </Tabs>
  )
}

export default RootLayout