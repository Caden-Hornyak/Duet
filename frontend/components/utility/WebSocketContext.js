import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { defaultAjax } from './CommonFunctions';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [chats, setChats] = useState({});

    useEffect(() => {
        const newSocket = io(process.env.EXPO_PUBLIC_EXPRESS_URL, {
        });

        newSocket.on('connect', async () => {
            // let res = await defaultAjax({
            //     action: 'get', 
            //     url: 'chats/', 
            //     includeToken: true, 
            //     retry: true
            // });

            // if (!res.error) {
            //     setChats(() => {
            //         const newState = {};
            //         for (let key in res) {
            //             newState[res[key].id] = res[key].messages;
            //         }
            //         return newState;
            //     });
            // }
            console.log('CLIENT Connected to server');
        });

        newSocket.on('disconnect', () => {
            console.log('CLIENT Disconnected from server');
        });

        newSocket.on('receiveMessage', async ({ senderId, chatId, message }) => {
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

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ socket, chats }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketContext;