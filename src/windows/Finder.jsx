import { Mic, Search, XIcon } from 'lucide-react';
import { WindowController } from '@components';
import { locations } from '@constants';
import WindowWrapper from '@hoc/WindowWrapper';
import useLocationStore from '@store/location';
import useWindowStore from '@store/window';
import { useEffect, useMemo, useState } from 'react';
import FooterItem from '@components/FooterItem';
import RenderList from '@components/RenderList';
import NotFound from '@components/NotFound';

const Finder = () => {
  const { closeWindow, openItem } = useWindowStore();
  const {
    activeLocation,
    setActiveLocation,
    search,
    filtered,
    isProjectFound,
    handleChange,
    controlledInput,
    resetSearch,
  } = useLocationStore();
  // const [input, setInput] = useState('');
  const [activateInput, setActivateInput] = useState(false);
  const [folder, setFolder] = useState('images');

  const extractIcon = (item) => {
    const pathSegments = item.icon.split('/').slice(2);
    const fileName = pathSegments.join('/');
    return fileName === 'folder.png'
      ? `${folder}/${fileName}`
      : `images/${fileName}`;
  };

  const filteredItems = useMemo(() => {
    if (!activeLocation?.children) return [];

    const query = controlledInput.trim().toLowerCase();

    if (!query) return activeLocation.children;

    return activeLocation.children.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
  }, [activeLocation, controlledInput]);

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

  const isWorkRoot = activeLocation.id === locations.work.id;

  const isAboutMeRoot = activeLocation.id === locations.about.id;

  return (
    <>
      <div id='window-header'>
        <WindowController target='finder' />

        {activateInput && (
          <div className='search'>
            <Search className='icon' />
            <input
              value={controlledInput}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={(e) => {
                search(e, controlledInput, activeLocation);
              }}
              type='text'
              placeholder='Search or enter name'
              className='flex-2'
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
                resetSearch();
              }}
            />
          </div>
        )}
      </div>

      <div className='bg-white flex max-sm:block h-full dark:bg-[#333237] dark:text-white max-sm:dark:bg-[#1e1e1e]'>
        {/* start of mobile device header */}
        <div className='small-screen'>
          <div>
            <img
              src='/mobile/back.png'
              alt='go back'
              onClick={() => {
                isWorkRoot
                  ? closeWindow('finder')
                  : setActiveLocation(locations.work);
              }}
            />
            <h4 className='truncate w-20 '>{activeLocation.name}</h4>
            <img
              src='/mobile/cancel.png'
              alt='cancel'
              onClick={() => {
                closeWindow('finder');
                setActiveLocation(locations.work);
              }}
            />
          </div>
          <div className='search'>
            <Search className='icon size-6.5' />

            <input
              value={controlledInput}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={(e) => search(e, controlledInput, activeLocation)}
              type='text'
              placeholder='Search'
              className='flex-2'
            />
            <Mic className='icon size-6.5' />
          </div>
        </div>
        {/* end of  mobile device header */}
        <div className='sidebar'>
          <RenderList
            name='Favorites'
            items={Object.values(locations)}
            setActiveLocation={setActiveLocation}
            activeLocation={activeLocation}
          />
          <RenderList
            name='Work'
            items={locations.work.children}
            setActiveLocation={setActiveLocation}
            activeLocation={activeLocation}
          />
        </div>
        <ul className='content'>
          {(filteredItems ? filteredItems : filtered.children)?.map((item) => {
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
        {!isProjectFound && filteredItems.length === 0 && <NotFound />}

        <div className='footer'>
          <div>
            <FooterItem
              label='Work'
              icon='/mobile/work.png'
              isActive={isWorkRoot}
              onClick={() => {
                setActiveLocation(locations.work);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setActiveLocation(locations.work);
                }
              }}
            />

            <FooterItem
              label='About Me'
              icon='/mobile/time.png'
              isActive={isAboutMeRoot}
              onClick={() => {
                setActiveLocation(locations.about);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
const FinderWindow = WindowWrapper(Finder, 'finder');
export default FinderWindow;
