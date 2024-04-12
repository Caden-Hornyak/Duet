import React from 'react';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
      <Stack>
        <Stack.Screen name="[id]" options={{
            headerShown: false,
            gestureDirection: 'horizontal',
            gestureResponseDistance: 100,
            gestureVelocityImpact: 0
        }}/>
      </Stack>
  )
}

export default RootLayout