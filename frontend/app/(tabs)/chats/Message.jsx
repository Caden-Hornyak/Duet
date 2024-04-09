import React, {useEffect, useState, useContext} from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import WebSocketContext from '../../../components/utility/WebSocketContext';

const Message = () => {
  // useEffect(() => {
    
    
  //   socket.emit('sendMessage', { senderId, recipientIds, message });
  // }, [])

  const { socket, messages } = useContext(WebSocketContext);
  const [currMessage, setCurrMessage] = useState({})
  useEffect(() => {
    console.log(socket, messages)
  }, [messages])

  const submitMessage = async () => {
    if (currMessage.length > 0) {
      const message = currMessage;
      setCurrMessage('');

      let res = await defaultAjax({
        action: 'post', 
        url: 'token/', 
        actionBody: formData, 
        stringify: false, 
        includeToken: false, 
        retry: false
      });
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Enter text here..."
        onChangeText={text => setCurrMessage(text)}
      />
      <TouchableOpacity
        onPress={submitMessage}
        activeOpacity={0.7} 
      >
        <Text style={{fontSize: 14}}>Submit</Text>
      </TouchableOpacity>
      <Text>hello</Text>
    </View>
  )
}

export default Message