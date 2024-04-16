import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { defaultAjax } from './CommonFunctions';
import camelize from 'camelize';

const UserInformationContext = createContext(null);

export const UserInformationProvider = ({ children }) => {

    const [chats, setChats] = useState({});
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const socket = io(process.env.EXPO_PUBLIC_EXPRESS_URL, {
            query: {
                userId: 'your_user_id_here'
              }
        });

        socket.on('connect', async () => {

            let profileRes = await defaultAjax({
                action: 'get', 
                url: 'userprofile/', 
                includeToken: true, 
                retry: true
            });

            if (!profileRes.error) {
                setUserProfile(camelize(profileRes));
            }

            let chatRes = await defaultAjax({
                action: 'get', 
                url: 'chat/', 
                includeToken: true, 
                retry: true
            });

            if (!chatRes.error) {
                setChats(() => {
                    const newState = {};
                    for (let key in chatRes) {
                        newState[chatRes[key].id] = camelize(chatRes[key]);
                        newState[chatRes[key].id]['loadedMessages'] = 20;
                    }
                    return newState;
                });
            }

            console.log('CLIENT Connected to server');
        });
        socket.on('receiveMessage', async ({ chatId, message }) => {
            console.log('CLIENT Received message:', message);
            if (chatId in chats) {
                chats[chatId].push(message);
            } else {

                let res = await defaultAjax({
                    action: 'get', 
                    url: `chat/${chatId}`, 
                });
                setChats(prevState => {
                    const newState = {};

                    for (let key in prevState) {
                        newState[key] = prevState[key];
                    }
                    newState[chatId] = res;
                    return newState;
                });
            }
        });

        socket.on('disconnect', () => {
            console.log('CLIENT Disconnected from server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <UserInformationContext.Provider value={{ userProfile, chats, setChats }}>
            {children}
        </UserInformationContext.Provider>
    );
};

export default UserInformationContext;