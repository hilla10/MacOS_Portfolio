import { WindowController } from '@components';
import WindowWrapper from '@hoc/WindowWrapper';
import useWindowStore from '@store/window';
import React from 'react';

const Text = () => {
  const data = useWindowStore((s) => s.windows.txtfile.data);

  if (!data) return null;

  const { name, image, imageUrl, subtitle, description } = data;

  return (
    <>
      <div id='window-header'>
        <WindowController target='txtfile' />
        <h2>{name}</h2>
      </div>

      <div className='p-5 space-y-6 bg-white dark:bg-[#1e1e1e]'>
        {image || imageUrl ? (
          <div className='w-full'>
            <img
              src={image || imageUrl}
              alt={name}
              className='w-full h-auto rounded'
            />
          </div>
        ) : null}

        {subtitle ? (
          <h3 className='text-lg font-semibold dark:text-white'>{subtitle}</h3>
        ) : null}

        <div className=' space-y-4'>
          {Array.isArray(description) &&
            description.map((p, i) => (
              <p key={i} className='text-base dark:text-white'>
                {p}
              </p>
            ))}
        </div>
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, 'txtfile');

export default TextWindow;
