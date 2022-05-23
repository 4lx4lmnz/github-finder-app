import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserItem from '../components/users/UserItem';
import GitHubContext from '../context/github/GitHubContext';

function User() {
  const { getUser, user } = useContext(GitHubContext);

  const params = useParams();

  useEffect(() => {
    getUser(params.login);
  }, []);

  return <UserItem user={user} />;
}

export default User;
