import React, { useContext } from 'react';
import UserInformationContext from '../../../components/utility/UserInformationContext';
import UserProfile from '../../../components/views/UserProfile';


const PersonalProfile = () => {
  let { userProfile } = useContext(UserInformationContext);

  return (
    <>
      <UserProfile userProfile={userProfile}/> 
    </>
  );
}

export default PersonalProfile