import { Text, View, TextInput, Button, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { defaultAjax } from '../../components/utility/CommonFunctions';
import * as SecureStore from 'expo-secure-store';
import { Redirect } from 'expo-router';
import { jwtDecode } from 'jwt-decode';

const Login = () => {

  let [redir, setRedir] = useState(null)

  let [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  let handleFormChange = (text, name) => setFormData(prev_state => ({...formData, [name]: text}))
  
  let handleSubmit = async () => {
    
    let res = await defaultAjax({
      action: 'post', 
      url: 'token/', 
      actionBody: formData, 
      stringify: false, 
      includeToken: false, 
      retry: false
    });

    if (!res.error) {
      await SecureStore.setItemAsync('refresh', res.refresh);
      await SecureStore.setItemAsync('access', res.access);
      setRedir('/')
    }
  }

  return (
    <SafeAreaView>
      {redir && <Redirect href={redir} />}
      <TextInput
      placeholder="Enter text here..."
      onChangeText={text => handleFormChange(text, 'username')}
      />
      <TextInput
      placeholder="Enter text here..."
      onChangeText={text => handleFormChange(text, 'password')}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
  )
}

export default Login