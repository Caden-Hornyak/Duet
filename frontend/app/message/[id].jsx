import React, {useEffect, useState, useContext} from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, FlatList } from 'react-native';
import UserInformationContext from '../../components/utility/UserInformationContext';
import { useLocalSearchParams } from 'expo-router';

const Message = () => {

  const { id } = useLocalSearchParams();

  const [currMessage, setCurrMessage] = useState({});
  const { chats } = useContext(UserInformationContext);

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
  };

  const renderItem = ({ item }) => {
    return (
      <View>
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
  }
});