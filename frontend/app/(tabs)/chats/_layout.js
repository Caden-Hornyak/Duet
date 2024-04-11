import React from 'react'
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="Chats" options={{
            // headerShown: false
        }}/>
        <Stack.Screen name="[id]" options={{
        }}/>
    </Stack>
  )
}

export default RootLayout