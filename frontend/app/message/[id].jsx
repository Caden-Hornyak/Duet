import 'react-native-get-random-values';
import React, {useEffect, useState, useContext} from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, FlatList } from 'react-native';
import UserInformationContext from '../../components/utility/UserInformationContext';
import { defaultAjax } from '../../components/utility/CommonFunctions';
import { useLocalSearchParams } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';

const Message = () => {

  const { id } = useLocalSearchParams();

  const [currMessage, setCurrMessage] = useState('');
  const [newMessages, setNewMessages] = useState([]);
  const { userProfile, chats, setChats } = useContext(UserInformationContext);

  const submitMessage = async () => {
    if (currMessage.length > 0) {
      const message = currMessage;
      setCurrMessage('');
      
      // set placeholder
      const messageId = uuidv4();
      setChats(prevState => {
        const newState = [{text: message, id: messageId, writer: userProfile.id}, ...prevState[id].messages]

        // update specific chats messages
        return {...prevState, [id]: {...prevState[id], messages: newState}}
      }
        
      );


      let res = await defaultAjax({
        action: 'post', 
        url: 'message/', 
        actionBody: { 'message': message, 'chat': chats[id].id}, 
        stringify: false, 
      });

      if (!res.error) {
        setChats(prevState => {
          const newState = [...prevState[id].messages];
          for (let i = 0; i < newState.length; i++) {
            if (newState[i].id === messageId) {
              console.log('res: ', res)
              newState[i] = res;
            }
          }
          return {...prevState, [id]: {...prevState[id], messages: newState}};
        });
      }
    }
  };
  useEffect(() => {
    console.log("CHATS: ", chats)
  }, [chats])
  const renderItem = ({ item }) => {  
    const selfSent = userProfile.id === item.writer;
    return (
      <View style={[styles.message, {backgroundColor: selfSent ? 'red': 'grey',
      alignSelf: selfSent ? 'flex-end': 'flex-start'}]}>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1, marginBottom: 75}}>
            <FlatList 
                data={(chats && id in chats) ? Object.values(chats[id].messages) : []}
                renderItem={renderItem}
                keyExtractor={item => item.id}  
                inverted 
            />
        </View>
        <View style={styles.bottomBlock}>
          <TextInput
            placeholder="Message..."
            value={currMessage}
            onChangeText={text => setCurrMessage(text)}
            style={styles.textInput}
          />
          <TouchableOpacity
            onPress={submitMessage}
            activeOpacity={0.7} 
          >
            <Text style={{fontSize: 14}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Message

const styles = StyleSheet.create({
  bottomBlock: {
    borderWidth: 1,
    height: 75,
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 50,
    flex: 1
  },
  message: {
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
    marginHorizontal: 10
  }
});