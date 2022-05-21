import { React, useContext, useEffect } from 'react';
import GitHubContext from '../../context/github/GitHubContext';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

function UserResults() {
  const { users, loading, fetchUsers } = useContext(GitHubContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <>
        <h3>Loading...</h3>
        <Spinner />
      </>
    );
  } else {
    return (
      <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {users.map((user) => {
          return <UserItem key={user.id} user={user} />;
        })}
      </div>
    );
  }
}

export default UserResults;
