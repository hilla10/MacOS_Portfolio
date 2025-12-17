import { WindowController } from '@components';
import MobileHeader from '@components/MobileHeader';
import { blogPosts } from '@constants';
import WindowWrapper from '@hoc/WindowWrapper';
import useWindowStore from '@store/window';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
  Mic,
} from 'lucide-react';
import { useState } from 'react';

const Safari = () => {
  const { closeWindow } = useWindowStore();
  const [input, setInput] = useState('');

  const blogs = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      <div id='window-header'>
        <WindowController target='safari' />

        <PanelLeft className='ml-10 icon' />

        <div className='flex items-center gap-1 ml-5 '>
          <ChevronLeft className='icon' />
          <ChevronRight className='icon' />
        </div>

        <div className='flex-1 flex-center gap-3'>
          <ShieldHalf className='icon' />

          <div className='search'>
            <Search className='icon' />

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type='text'
              placeholder='Search or enter title name'
              className='flex-2'
            />
          </div>
        </div>

        <div className='flex items-center gap-5'>
          <Share className='icon' />
          <Plus className='icon' />
          <Copy className='icon' />
        </div>
      </div>

      <MobileHeader closeWindow={closeWindow} name='Safari' type='safari' />

      <div className='blog'>
        <h2>My Developer Blog</h2>

        <div className='space-y-8'>
          {blogs?.map(({ id, date, title, image, link }) => (
            <div key={id} className='blog-post'>
              <div className='col-span-2 max-sm:col-span-3 '>
                <img src={image} alt={title} />
              </div>

              <div className='content'>
                <p>{date}</p>
                <h3>{title}</h3>
                <a href={link} target='_blank' rel='noopener noreferrer'>
                  Check out the full post <MoveRight className='icon-hover' />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='footer-gallery'>
        <div className='search'>
          <Search className='icon size-6.5' />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Search or enter title name'
            className='flex-2'
          />
          <Mic className='icon size-6.5' />
        </div>
        <div className='flex-between'>
          <img src='/mobile/left-arrow.png' alt='Left Arrow' />
          <img src='/mobile/right-arrow.png' alt='Right Arrow' />
          <img src='/mobile/upload.png' alt='Upload' />
          <img src='/mobile/book.png' alt='Book' />
          <img src='/mobile/copy.png' alt='Copy' />
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, 'safari');

export default SafariWindow;
