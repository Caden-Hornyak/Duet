import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

export const defaultAjax = async ({
    action, 
    url, 
    actionBody='', 
    stringify=true, 
    includeToken=true, 
    retry=true
}) => {

    const config = {
        headers: {
            'Accept': 'application/json',
        },
        withCredentials: true
    };

    if (includeToken) {
        const token = await SecureStore.getItemAsync('access');
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {

        let body;
        if (action === 'post') {
            if (stringify) {
                body = JSON.stringify(actionBody);
            } else {
                body = actionBody;
            }
        }
        

        let res;

        if (action === 'post') {
            res = await axios.post(`${process.env.EXPO_PUBLIC_DJANGO_URL}/api/${url}`, body, config);
        } else if (action === 'get') {
            res = await axios.get(`${process.env.EXPO_PUBLIC_DJANGO_URL}/api/${url}`, config);
        } else if (action === 'put') {
            res = await axios.put(`${process.env.EXPO_PUBLIC_DJANGO_URL}/api/${url}`, body, config);
        } else {
            return ({'error': 'Invalid HTTP method'});
        }
        
        return res.data;

    } catch (err) {   
        // Token has expired
        if (retry && err.response.status === 401) {
            
            let success = await getAccessToken();
            if (!success) {
                return ({ 'reauthenticate': 'You are timed out. You need to reauthenticate your account.'});
            } else {
                return await defaultAjax({action: action, url: url, actionBody: actionBody, 
                    stringify: stringify, includeToken: includeToken, retry: false});
            }
        }

        return ({'error': err});
    }
}

export const getAccessToken = async () => {
    const refreshToken = await SecureStore.getItemAsync('refresh');

    if (!refreshToken) {
        return false;
    } else {
        let res = await defaultAjax({
            action: 'post', 
            url: 'token/refresh/', 
            actionBody: {'refresh': refreshToken }, 
            stringify: false, 
            retry: false
        });

        if (res.access) {
            await SecureStore.setItemAsync('access', res.access);
            return true;
        } else {
            return false;
        }
    }
}