import React from 'react';

const MobileHeader = ({ closeWindow, name, type }) => {
  return (
    <div className='small-screen'>
      <img
        src='/mobile/back.png'
        alt='go back'
        onClick={() => closeWindow(type)}
      />
      <h2>{name}</h2>
    </div>
  );
};

export default MobileHeader;
