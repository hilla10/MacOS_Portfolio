import { Download } from 'lucide-react';
import React from 'react';

const MobileHeader = ({ closeWindow, name, type }) => {
  return (
    <div className={`small-screen ${type === 'resume' && 'justify-between'}`}>
      <button
        onClick={() => closeWindow(type)}
        className='back-button'
        aria-label='Go back'>
        <img src='/mobile/back.png' alt='' aria-hidden='true' />
      </button>{' '}
      <h2>{name}</h2>
      {type === 'resume' && (
        <a
          href='/files/resume.pdf'
          download
          className='cursor-pointer dark:text-white'
          title='Download Resume'>
          <Download className='icon' />
        </a>
      )}
    </div>
  );
};

export default MobileHeader;
