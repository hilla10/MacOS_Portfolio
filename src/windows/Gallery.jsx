import { WindowController } from '@components';
import { gallery, photosLinks } from '@constants';
import WindowWrapper from '@hoc/WindowWrapper';
import { Mail, Search } from 'lucide-react';
import React from 'react';

const Gallery = () => {
  return (
    <>
      <div id='window-header'>
        <WindowController target='photos' />
        <div className='ml-22 flex flex-1'>
          <Mail className='icon ' />
        </div>
        <Search className='icon' />
      </div>

      <div className='bg-white flex h-full'>
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
    </>
  );
};

const GalleryWindow = WindowWrapper(Gallery, 'photos');

export default GalleryWindow;
