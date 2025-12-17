import { WindowController } from '@components';
import MobileHeader from '@components/MobileHeader';
import { techStack } from '@constants';
import WindowWrapper from '@hoc/WindowWrapper';
import useWindowStore from '@store/window';
import { Check, Flag } from 'lucide-react';
import React from 'react';

const Terminal = () => {
  const { closeWindow } = useWindowStore();
  return (
    <>
      <div id='window-header'>
        <WindowController target='terminal' />
        <h2>Tech Stack</h2>
      </div>

      <MobileHeader
        closeWindow={closeWindow}
        name='Tech Stack'
        type='terminal'
      />

      <div className='techstack'>
        <p>
          <span className='font-bold'>@Hailemichael % </span>
          show tech stack
        </p>

        <div className='label dark:text-white'>
          <p className='w-32'>Category</p>
          <p>Technologies</p>
        </div>

        <ul className='content'>
          {techStack.map(({ category, items }) => (
            <li key={category} className='flex items-center'>
              <Check className='check ' size={20} />
              <h3>{category}</h3>

              <ul>
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? ',' : ''}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className='footnote'>
          <p className='text-[#00A154] dark:text-[#00A154]'>
            <Check size={20} /> 5 of 5 stack loaded successfully (100%)
          </p>
          <p className='text-black dark:text-white'>
            <Flag size={15} className='fill-black dark:fill-white' />
            Render time: 6ms
          </p>
          <p className='text-black dark:text-white pt-6'>
            @Haila % github stats
          </p>
        </div>
      </div>
      <div className='footer-gallery'>
        <img src='/mobile/check.png' alt='Check' />
        <img src='/mobile/camera.png' alt='Camera' />
        <img src='/mobile/pen.png' alt='Pen' />
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, 'terminal');

export default TerminalWindow;
