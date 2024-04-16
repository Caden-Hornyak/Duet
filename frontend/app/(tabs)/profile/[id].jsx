import React, { useEffect, useState } from 'react';
import UserInformationContext from '../../../components/utility/UserInformationContext';
import UserProfile from '../../../components/views/UserProfile';
import { useLocalSearchParams } from 'expo-router';
import { defaultAjax } from '../../../components/utility/CommonFunctions';
import camelize from 'camelize';

const Profile = () => {

    const { id } = useLocalSearchParams();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            let res = await defaultAjax({
                action: 'get', 
                url: `userprofile/${id}`, 
            });
            setUserProfile(camelize(res));
        };
        getProfile();
    }, []);

    console.log(userProfile)

  return (
    <UserProfile userProfile={userProfile} />
  );
}

export default Profile