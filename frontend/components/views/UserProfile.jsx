import React, { useEffect, useState, useContext } from 'react';
import { Text, View, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Skeleton } from 'moti/skeleton';
import { Redirect } from 'expo-router';
import { Link } from 'expo-router';

const SkeletonCommonProps =  () => {
  return {
    colorMode: 'light',
    transition: {
      type: 'timing',
      duration: 2000,
    },
    backgroundColor: '#000000'
  }
}

const UserProfile = ({ userProfile }) => {

  let [redir, setRedir] = useState(null);
  let tags = ['Beginner', 'Piano', 'Classical Music', 'Chopin', 'Liszt', 'Rachmaninoff'];
  //else if (res.reauthenticate) {
    //setRedir('/')

  return (
    <SafeAreaView >
      <Skeleton.Group show={!userProfile}>
      {redir && <Redirect href={redir} />}
      <View style={{marginBottom: 20}}>
        <View style={styles.profilePictureWrapper}>
          <Skeleton {...SkeletonCommonProps(0)} radius={'round'} width={220} height={220}>
          {userProfile && <Image source={{ uri: userProfile.profilePicture }} 
            style={styles.profilePicture} />}
          </Skeleton>
        </View>
        
        <View style={styles.publicNameWrapper}>
          <Skeleton height={40} width={175} {...SkeletonCommonProps(1)}>
            {userProfile && <Text style={[styles.text, {fontSize: 35}]}>{userProfile.publicName}</Text>}
          </Skeleton>
        </View>
        
        {(userProfile && userProfile.username) && 
        <View style={styles.privateNameWrapper}>
          <Skeleton height={20} width={75} {...SkeletonCommonProps(1)}>
            {userProfile && <Text style={[styles.text, {fontSize: 15, color: '#979797'}]}>
              {userProfile.username}</Text>}
          </Skeleton>
        </View>}
       
          
        {(userProfile && userProfile.friends) &&
        <Link href={"/(tabs)/profile/FriendList"}
            asChild>
            <TouchableOpacity>
                <Text>Friends {userProfile.friends.length}</Text>
            </TouchableOpacity> 
            </Link>
        }
      </View>

      <View style={styles.aboutMeWrapper}>
        <Skeleton height={135} width={350} {...SkeletonCommonProps(2)}>
          <View style={styles.bottomSection}>
            <Text style={styles.h3}>About me</Text>
            <Text style={[styles.description]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
            </Text>
          </View>
        </Skeleton>
      </View>
      
      <View style={styles.tagWrapper}>
        <Skeleton height={135} width={350} {...SkeletonCommonProps(3)}>
          <View style={styles.bottomSection}>
            <Text style={styles.h3}>Tags</Text>

            <View style={styles.tagInsideWrapper}>
              {
                tags.map((tag) => {
                  return (
                    <TouchableOpacity
                      onPress={() => console.log("Clicked")}
                      onPressIn={this.handlePressIn}
                      onPressOut={this.handlePressOut}
                      activeOpacity={0.7} 
                      style={styles.tag}
                      key={tag}
                    >
                      <Text style={{fontSize: 14}}>{tag}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        </Skeleton>
      </View>
      </Skeleton.Group>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  profilePicture: { 
    width: 220, 
    height: 220, 
    borderRadius: 110,
  },
  profilePictureWrapper: {
    alignSelf: 'center',
    marginTop: 30
  },
  publicNameWrapper: {
    marginTop: 20,
    alignSelf: 'center'
  },
  privateNameWrapper: {
    marginTop: 2,
    alignSelf: 'center'
  },
  description: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 15
  },
  bottomSection: {
    width: 350,
    alignSelf: 'center'
  },
  aboutMeWrapper: {
    alignSelf: 'center',
  },
  tagInsideWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  tag: {
    backgroundColor: 'red',
    alignSelf: 'left',
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 50
  },
  tagWrapper: {
    marginTop: 20,
    alignSelf: 'center'
  },
  h3: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 5
  },
  text: {
    textAlign: 'center'
  }
});

export default UserProfile