import React from 'react'
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="Video" />
    </Stack>
  )
}

export default RootLayout