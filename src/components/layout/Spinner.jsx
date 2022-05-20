import React from 'react';
import spinner from './assets/spinner.gif';

function Spinner() {
  return (
    <div className='w-100 mt-20'>
      <img
        className='text-center mx-auto'
        src={spinner}
        width={180}
        alt='Load Spinner'
      />
    </div>
  );
}

export default Spinner;
