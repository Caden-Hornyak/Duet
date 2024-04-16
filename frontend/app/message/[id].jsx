import 'react-native-get-random-values';
import React, {useEffect, useState, useContext} from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, FlatList, ActivityIndicator, KeyboardAvoidingView,
Platform } from 'react-native';
import UserInformationContext from '../../components/utility/UserInformationContext';
import { defaultAjax } from '../../components/utility/CommonFunctions';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const Message = () => {

  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: (chats && chats[id]) ? chats[id].name: '', headerBackTitle: ''});
  }, [navigation, chats])

  const [currMessage, setCurrMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allMessagesLoaded, setAllMessagesLoaded] = useState(false);
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

  const renderItem = ({ item, index }) => {  
    const selfSent = userProfile.id === item.writer;

    let dateText = null;
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    let currDate = moment(chats[id].messages[index].dateCreated).toObject(), prevDate;
    const chatMsgsLen = chats[id].messages.length;

    if (index === chatMsgsLen-1) {
      prevDate = {years: -1};
    } else {
      prevDate = moment(chats[id].messages[index+1].dateCreated).toObject();
    }

    let sentBeforeStyles = false, sentAfterStyles = false;
    if (prevDate.years !== currDate.years)
      dateText = `${months[currDate.months]} ${currDate.date}, ${currDate.years}`;
    else if (prevDate.months !== currDate.months || prevDate.date !== currDate.date) {
      dateText = `${months[currDate.months]} ${currDate.date}, ${currDate.hours % 12}:${currDate.minutes < 10 ? `0${currDate.minutes}` : currDate.minutes} ${currDate.hours > 12 ? 'PM': 'AM'}`;
    } else {
      if (index+1 < chatMsgsLen && chats[id].messages[index+1].writer === item.writer) {
        sentBeforeStyles = true;
      }
    }

    if (index-1 >= 0 && chats[id].messages[index-1].writer === item.writer) {
      sentAfterStyles = true;
    }
    
    let messageStyles = {
      borderTopLeftRadius: selfSent || !sentBeforeStyles ? 22: 7,
      borderBottomLeftRadius: selfSent || !sentAfterStyles ? 22: 7,
      borderBottomRightRadius: !selfSent || !sentAfterStyles ? 22: 7,
      borderTopRightRadius: !selfSent || !sentBeforeStyles ? 22: 7,
      marginTop: sentBeforeStyles ? 1 : 10,
      marginBottom: sentAfterStyles ? 0 : 10,
      backgroundColor: selfSent ? 'red': 'grey',
      alignSelf: selfSent ? 'flex-end': 'flex-start'
    };

    if (index === chatMsgsLen-2) {
      console.log(dateText)
    }
    return (
      <>
      
        <View style={[styles.message, messageStyles]}>
          <Text style={{fontSize: 16, color: 'white', textAlign: 'center'}}>{item.text}</Text>
        </View>
        {dateText && <Text style={styles.dates}>{dateText}</Text>}
      </>
    );
  };

  const fetchMoreMessages = async () => {

    if (isLoading || allMessagesLoaded) {
      return;
    }

    setIsLoading(true);

    let res = await defaultAjax({
      action: 'get', 
      url: `message/${chats[id].id}/${chats[id].loadedMessages}/${chats[id].loadedMessages+40}/`, 
    });
    console.log("RES", res)
    if (!res.error) {
      if (res.length > 0) {
        setChats(prevState => (
          {...prevState, 
            [id]: {...prevState[id], 
              messages: [...prevState[id]['messages'], ...res], 
              loadedMessages: prevState[id].loadedMessages + 40
            }})
        );
      } else {
        setAllMessagesLoaded(true);
      }

      setIsLoading(false);
    }

  };

  const displayLoader = () => {
    if (isLoading) {
      return (
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1, position: 'relative'}} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{flex: 1, marginBottom: 75}}>
            <FlatList 
                data={(chats && id in chats) ? Object.values(chats[id].messages) : []}
                renderItem={renderItem}
                keyExtractor={item => item.id}  
                inverted 
                onEndReached={fetchMoreMessages} // Function called when user reaches the end of the list
                onEndReachedThreshold={0.1} // Distance from the end of the list at which onEndReached is triggered
                ListFooterComponent={displayLoader} 
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
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
    padding: 15,
    marginHorizontal: 10,
    minWidth: 50,
  },
  dates : {
    marginVertical: 10, 
    alignSelf: 'center',
    fontSize: 13 
  }
});