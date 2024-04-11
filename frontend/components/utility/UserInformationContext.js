import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { defaultAjax } from './CommonFunctions';
import camelize from 'camelize';

const UserInformationContext = createContext(null);

export const UserInformationProvider = ({ children }) => {

    const [chats, setChats] = useState({});
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const socket = io(process.env.EXPO_PUBLIC_EXPRESS_URL);

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
                    }
                    return newState;
                });
            }

            console.log('CLIENT Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('CLIENT Disconnected from server');
        });

        socket.on('receiveMessage', async ({ senderId, chatId, message }) => {
            console.log('CLIENT Received message:', message);
            // if (chatId in chats) {
            //     chats[chatId].push(message);
            // } else {
            //     let res = await defaultAjax({
            //         action: 'get', 
            //         url: `chat/${chatId}`, 
            //         includeToken: true, 
            //         retry: true
            //     });
            //     setChats(prevState => {
            //         prevState[chatId] = res;
            //     });
            // }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <UserInformationContext.Provider value={{ userProfile, chats }}>
            {children}
        </UserInformationContext.Provider>
    );
};

export default UserInformationContext;