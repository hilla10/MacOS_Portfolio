import { WindowController } from '@components';
import MobileHeader from '@components/MobileHeader';
import { gallery, photosLinks } from '@constants';
import WindowWrapper from '@hoc/WindowWrapper';
import useWindowStore from '@store/window';
import { Mail, Mic, Search } from 'lucide-react';
import React from 'react';

const Gallery = () => {
  const { closeWindow } = useWindowStore();
  return (
    <>
      <div id='window-header'>
        <WindowController target='photos' />
        <div className='ml-5 flex flex-1 max-sm:hidden'>
          <Mail className='icon ' />
        </div>
        <Search className='icon max-sm:hidden' />
      </div>

      <MobileHeader closeWindow={closeWindow} name='All Photos' type='photos' />

      <div className='bg-white dark:bg-[#333237] flex h-full'>
        <div className='sidebar'>
          <div>
            <h2>Photos</h2>
            <ul>
              {photosLinks.map((item) => (
                <li key={item.id}>
                  <img src={item.icon} className='w-4' alt={item.title} />
                  <p className='text-sm font-medium truncate'>{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='gallery'>
          <ul>
            {gallery.map(({ id, img }) => (
              <li key={id} className='flex items-center gap-2'>
                <img src={img} alt={`gallery-${id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='footer-gallery'>
        <img src='/mobile/photo.png' alt='Photo' />
        <img src='/mobile/album.png' alt='Album' />
        <img src='/mobile/search.png' alt='Search' />
      </div>
    </>
  );
};

const GalleryWindow = WindowWrapper(Gallery, 'photos');

export default GalleryWindow;
