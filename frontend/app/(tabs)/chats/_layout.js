import React from 'react'
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="Message" options={{
          headerShown: false
        }}/>
    </Stack>
  )
}

export default RootLayout