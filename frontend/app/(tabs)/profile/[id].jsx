import React, { useEffect } from 'react';
import UserInformationContext from '../../../components/utility/UserInformationContext';
import UserProfile from '../../../components/views/UserProfile';
import { useLocalSearchParams } from 'expo-router';

const Profile = () => {

    const { id } = useLocalSearchParams();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            let res = await defaultAjax({
                action: 'get', 
                url: `userprofile/${id}`, 
            });
            setUserProfile(res);
        };
        getProfile();
    }, []);

  return (
    <UserProfile userProfile={userProfile} />
  );
}

export default Profile