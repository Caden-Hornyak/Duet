import { Provider } from 'react-redux';
import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { UserInformationProvider } from '../components/utility/UserInformationContext';

const RootLayout = () => {
  return (
    <UserInformationProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{
          headerShown: false
        }}/>
        <Stack.Screen name="(authentication)" options={{
          headerShown: false
        }}/>
        <Stack.Screen name="message/[id]" options={{
          gestureDirection: 'horizontal',
          gestureResponseDistance: 100,
          gestureVelocityImpact: 0
        }}/>
      </Stack>
    </UserInformationProvider>
  )
}

export default RootLayout