import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import UserInformationContext from '../utility/UserInformationContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const UserList = ({users}) => {

  let renderUserItems = ({ item }) => {
    return (
      <Link href={{
        pathname: "/(tabs)/profile/[id]",
        params: { id: item.id }
        }}
          asChild>
        <TouchableOpacity>
          <View style={styles.friendItemWrapper}>
            {item.profilePicture && <Image style={styles.profilePicture}
            source={{ uri: item.profilePicture }}></Image>}
            <View style={styles.rightBlock}>
              <Text style={styles.username}>
                {item.publicName}
              </Text>
              <MaterialIcons name="keyboard-arrow-right" size={40} color="black" style={{alignSelf: 'center', marginLeft: 'auto'}}/>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  }

  return (
      <FlatList
      data={users}
      renderItem={renderUserItems}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}

export default UserList

const styles = StyleSheet.create({
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  rightBlock: {
    flexDirection: 'row'
  },
  friendItemWrapper: {
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1,
    flex: 1
  },
  username: {
    fontSize: 18
  }
});