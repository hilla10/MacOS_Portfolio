import React from 'react';

const MobileHeader = ({ closeWindow, name, type }) => {
  return (
    <div className='small-screen'>
      <button
        onClick={() => closeWindow(type)}
        className='back-button'
        aria-label='Go back'>
        <img src='/mobile/back.png' alt='' aria-hidden='true' />
      </button>{' '}
      <h2>{name}</h2>
    </div>
  );
};

export default MobileHeader;
