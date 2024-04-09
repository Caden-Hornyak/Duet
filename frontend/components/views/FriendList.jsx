import { View, Text } from 'react-native'
import React from 'react'

const FriendList = ({friends}) => {

  let renderFriendItem = ({ item }) => {
    <View>
      
    </View>
  }

  return (
      <FlatList
      data={friends}
      renderItem={renderFriendItem}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}

export default FriendList