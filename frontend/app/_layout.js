import { Provider } from 'react-redux';
import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{
          headerShown: false
        }}/>
        <Stack.Screen name="(authentication)" options={{
          headerShown: false
        }}/>
    </Stack>
  )
}

export default RootLayout