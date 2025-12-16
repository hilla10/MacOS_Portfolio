import { WindowController } from '@components';
import WindowWrapper from '@hoc/WindowWrapper';
import useWindowStore from '@store/window';
import React from 'react';

const Image = () => {
  const { closeWindow } = useWindowStore();
  const data = useWindowStore((s) => s.windows.imgfile.data);

  if (!data) return null;

  const { name, imageUrl, position } = data;

  return (
    <>
      <div id='window-header'>
        <WindowController target='imgfile' />
        <img
          src='/mobile/back.png'
          alt='go back'
          onClick={() => closeWindow('imgfile')}
        />
        <h2 className='text-md font-bold'>{name}</h2>
      </div>

      <div className='p-5 bg-white dark:bg-[#1e1e1e]'>
        {imageUrl ? (
          <div className='w-full max-sm:h-screen'>
            <img
              src={imageUrl}
              alt={name}
              className={`${position} w-full h-auto sm:max-h-[70vh] object-contain sm:rounded`}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, 'imgfile');

export default ImageWindow;
