import { View, Text } from 'react-native';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import UserContext from '../components/utility/UserContext';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import "core-js/stable/atob";
import io from 'socket.io-client';

const Index = () => {
    
    let [redir, setRedir] = useState(null)
    
    useEffect(() => {
        let authenticate = async () => {
            let refreshToken = await SecureStore.getItemAsync('refresh');

            let expDate = refreshToken ? jwtDecode(refreshToken).exp: null

            if (expDate && expDate < Date.now()) {
                setRedir('(tabs)/profile')
            } else {
                setRedir('(authentication)')
            }
            
        }

        authenticate();
    }, [])

  return (
    <>
        {redir && <Redirect href={redir}/>}
    </>
  )
}

export default Index