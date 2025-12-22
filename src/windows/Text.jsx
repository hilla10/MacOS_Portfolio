import { WindowController } from '@components';
import WindowWrapper from '@hoc/WindowWrapper';
import useWindowStore from '@store/window';
import clsx from 'clsx';
import React from 'react';

const Text = () => {
  const { closeWindow } = useWindowStore();
  const data = useWindowStore((s) => s.windows?.txtfile?.data ?? null);

  if (!data) return null;

  const { name, image, imageUrl, subtitle, description } = data;

  return (
    <>
      <div id='window-header'>
        <WindowController target='txtfile' />
        <button
          onClick={() => closeWindow('txtfile')}
          className='max-sm:block hidden'
          aria-label='go back'>
          <img src='/mobile/back.png' alt='' className='w-20.5 h-5.5' />{' '}
        </button>{' '}
        <h2>{name}</h2>
      </div>
      <div className='p-5 space-y-6 bg-white dark:bg-[#1e1e1e]  max-sm:max-h-screen'>
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
              <p
                key={i}
                className={clsx(
                  'text-base dark:text-white',
                  i === description.length - 1 ? 'pb-22' : ''
                )}>
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
