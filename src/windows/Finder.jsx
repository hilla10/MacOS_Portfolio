import clsx from 'clsx';
import { Search, XIcon } from 'lucide-react';

import { WindowController } from '@components';
import { locations } from '@constants';
import WindowWrapper from '@hoc/WindowWrapper';
import useLocationStore from '@store/location';
import useWindowStore from '@store/window';
import { useState } from 'react';

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
  // const [filtered, setFiltered] = useState(null);

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

      <div className='bg-white flex h-full dark:bg-[#333237] dark:text-white'>
        <div className='sidebar'>
          {renderList('Favorites', Object.values(locations))}
          {renderList('Work', locations.work.children)}
        </div>
        <ul className='content'>
          {(filtered ? filtered.children : filteredItems)?.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}>
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
        {activateInput && !isProjectFound && filteredItems.length === 0 && (
          <div className='no-match'>
            <p className='text-[15px] font-medium'>No matching project found</p>
          </div>
        )}
      </div>
    </>
  );
};
const FinderWindow = WindowWrapper(Finder, 'finder');
export default FinderWindow;
