import clsx from 'clsx';
import { Mic, Search, XIcon } from 'lucide-react';

import { WindowController } from '@components';
import { locations } from '@constants';
import WindowWrapper from '@hoc/WindowWrapper';
import useLocationStore from '@store/location';
import useWindowStore from '@store/window';
import { useEffect, useState } from 'react';

const Finder = () => {
  const { openWindow } = useWindowStore();
  const {
    activeLocation,
    setActiveLocation,
    search,
    filtered,
    resetSearch,
    isProjectFound,
  } = useLocationStore();
  const [input, setInput] = useState('');
  const [activateInput, setActivateInput] = useState(false);
  const [folder, setFolder] = useState('images');

  const extractIcon = (item) => {
    const pathSegments = item.icon.split('/').slice(2);
    const fileName = pathSegments.join('/');
    return fileName === 'folder.png'
      ? `${folder}/${fileName}`
      : `images/${fileName}`;
  };
  const openItem = (item) => {
    if (item.fileType === 'pdf') return openWindow('resume');

    if (item.kind === 'folder') return setActiveLocation(item);

    if (['fig', 'url'].includes(item.fileType) && item.href)
      return window.open(item.href, '_blank');

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const filteredItems =
    input.trim().length > 0
      ? activeLocation.children.filter((item) =>
          item.name.toLowerCase().includes(input.toLowerCase())
        )
      : activeLocation.children;

  useEffect(() => {
    const handleResize = () => {
      const screen = window.innerWidth > 640 ? 'images' : 'mobile';
      setFolder(screen);
    };

    // Run on mount (deferred)
    setTimeout(handleResize, 0);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setActiveLocation(item);
              setInput('');
              resetSearch();
            }}
            className={clsx(
              item.id === activeLocation.id ? 'active' : 'not-active'
            )}>
            <img src={item.icon} className='w-4' alt={item.name} />
            <p className='text-sm font-medium truncate'>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id='window-header'>
        <WindowController target='finder' />

        {activateInput && (
          <div className='search'>
            <Search className='icon' />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => search(e, input, activeLocation)}
              type='text'
              placeholder='Search or enter name'
              className='fle-2'
            />
          </div>
        )}

        {!activateInput ? (
          <div className='dark:bg-[#1e1e1e] dark:text-white bg-white'>
            <Search className='icon' onClick={() => setActivateInput(true)} />
          </div>
        ) : (
          <div className='dark:bg-[#1e1e1e] dark:text-white bg-white'>
            <XIcon
              className='icon'
              onClick={() => {
                setActivateInput(false);
                setInput('');
                resetSearch();
              }}
            />
          </div>
        )}
      </div>

      <div className='bg-white flex max-sm:block h-full dark:bg-[#333237] dark:text-white'>
        {/* start of mobile device header */}
        <div className='small-screen'>
          <div>
            <img src='/mobile/back.png' alt='go back' />
            <h4 className='truncate w-20 '>{activeLocation.name}</h4>
            <img src='/mobile/cancel.png' alt='cancel' />
          </div>
          <div className='search'>
            <Search className='icon size-6.5' />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => search(e, input, activeLocation)}
              type='text'
              placeholder='Search'
              className='fle-2'
            />
            <Mic className='icon size-6.5' />
          </div>
        </div>
        {/* end of  mobile device header */}

        <div className='sidebar'>
          {renderList('Favorites', Object.values(locations))}
          {renderList('Work', locations.work.children)}
        </div>
        <ul className='content'>
          {(filtered ? filtered.children : filteredItems)?.map((item) => {
            const icon = extractIcon(item);
            return (
              <li
                key={item.id}
                className={item.position}
                onClick={() => openItem(item)}>
                <img src={icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            );
          })}
        </ul>
        {activateInput && !isProjectFound && filteredItems.length === 0 && (
          <div className='no-match'>
            <p className='text-[15px] font-medium'>No matching project found</p>
          </div>
        )}

        <div className='footer'>
          <div>
            <p>
              <img src='/mobile/work.png' alt='work' />
              Work
            </p>
            <p>
              <img src='/mobile/time.png' alt='time' />
              About Me
            </p>
          </div>
          {/* TODO: */}
        </div>
      </div>
    </>
  );
};
const FinderWindow = WindowWrapper(Finder, 'finder');
export default FinderWindow;
