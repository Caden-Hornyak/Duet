import React, { useContext } from 'react';
import UserInformationContext from '../../../components/utility/UserInformationContext';
import UserList from '../../../components/views/UserList';


const FriendList = () => {
  let { userProfile } = useContext(UserInformationContext);

  return (
    <>
      <UserList users={userProfile.friends}/> 
    </>
  );
}

export default FriendList