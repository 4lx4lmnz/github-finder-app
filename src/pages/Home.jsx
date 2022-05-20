import React from 'react';
import UserResults from '../components/users/UserResults';

function Home() {
  return (
    <>
      <h1 className='text-6xl'>Welcome</h1>
      {/** SEARCH COMPONENT */}
      <UserResults />
    </>
  );
}

export default Home;
