import { WindowController } from '@components';
import WindowWrapper from '@hoc/WindowWrapper';
import useWindowStore from '@store/window';
import React from 'react';

const Image = () => {
  const data = useWindowStore((s) => s.windows.imgfile.data);

  if (!data) return null;

  const { name, imageUrl, position } = data;

  return (
    <>
      <div id='window-header'>
        <WindowController target='imgfile' />
        <h2>{name}</h2>
      </div>

      <div className='p-5  bg-white'>
        {imageUrl ? (
          <div className='w-full'>
            <img
              src={imageUrl}
              alt={name}
              className={`${position} w-full h-auth max-h-[70vh] object-contain rounded`}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, 'imgfile');

export default ImageWindow;
