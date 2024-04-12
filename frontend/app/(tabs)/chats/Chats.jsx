import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import UserInformationContext from '../../../components/utility/UserInformationContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';


const Chats = () => {
    const { userProfile, chats } = useContext(UserInformationContext);

    const renderItem = ({ item }) => {

        const usedUsers = item.members
        .filter(user => user.id !== userProfile.id);
        
        const userString = usedUsers.map(user => user.publicName).join(', ');
        return (
            <Link href={{
                pathname: "/message/[id]",
                params: { id: item.id }
                }}
                 asChild>
                <TouchableOpacity>
                    <View style={styles.chatContainer}>
                        <View>
                            {usedUsers.length === 1 ?
                                <Image style={styles.imageSingle} source={{ uri: process.env.EXPO_PUBLIC_DJANGO_URL + usedUsers['0'].profilePicture }}></Image>
                            :
                                <View style={styles.doubleImageContainer}>
                                    <Image style={styles.imageDoubleFirst}
                                    source={{ uri: process.env.EXPO_PUBLIC_DJANGO_URL + usedUsers['0'].profilePicture}}></Image>
                                    <Image style={styles.imageDoubleSecond}
                                    source={{ uri: process.env.EXPO_PUBLIC_DJANGO_URL + usedUsers['1'].profilePicture}}></Image>
                                </View>
                            }
                        </View>
                        <View style={styles.textWrapper}>
                            <View style={{justifyContent: 'center', justifySelf: 'left', flex: 1}}>
                                <Text style={styles.chatName}>
                                    {userString.length <= 35 ? userString : userString.substring(0, 35) + '...'}
                                </Text>
                                {item.messages.length > 0 &&
                                    <Text style={styles.messagePreview}>
                                        {item.messages[0].text.length <= 35 ? item.messages[0].text : 
                                        item.messages[0].text.substring(0, 35) + '...'}
                                    </Text>
                                }
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={40} color="black" style={{alignSelf: 'center'}}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </Link>
        )
    };

    return (
        <View>
            {(chats && Object.keys(chats).length > 0) &&
                <FlatList 
                    data={chats ? Object.values(chats) : []}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}    
                />
            }
        </View>
    );
};

export default Chats

const styles = StyleSheet.create({
    chatContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: 10,
    },
    imageSingle: {
        width: 80, 
        height: 80, 
        borderRadius: 45,
    },
    doubleImageContainer: {
        width: 80,
        height: 80,
    },
    imageDoubleFirst: {
        width: 65, 
        height: 65, 
        borderRadius: 35,
        position: 'absolute',
        top: 0,
        left: 0
    },
    imageDoubleSecond: {
        width: 65, 
        height: 65, 
        borderRadius: 35,
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderWidth: 4
    },
    chatName: {
        fontSize: 17,
        fontWeight: '500'
    },
    textWrapper: {
        padding: 10,
        paddingLeft: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1
    },
    messagePreview: {
        fontSize: 14
    }
  });
  