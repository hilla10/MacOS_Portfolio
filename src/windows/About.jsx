import { WindowController } from '@components';
import MobileHeader from '@components/MobileHeader';
import { locations } from '@constants';
import WindowWrapper from '@hoc/WindowWrapper';
import useWindowStore from '@store/window';

const About = () => {
  const { closeWindow, openItem } = useWindowStore();

  //   const openItem = (item) => {
  //     if (item.kind === 'folder') return setActiveLocation(item);

  //     if (!item.fileType) {
  //       console.error('Item missing fileType:', item);
  //       return;
  //     }
  //     openWindow(`${item.fileType}-${item.kind}`, item);
  //   };
  return (
    <>
      <div id='window-header'>
        <WindowController target='about' />
        <h2 className='dark:text-white'>About</h2>
      </div>

      <MobileHeader closeWindow={closeWindow} name='About Me' type='about' />

      <div className='bg-white flex max-sm:block h-full dark:bg-[#333237] dark:text-white max-sm:dark:bg-[#1e1e1e]'>
        <ul className='content'>
          {locations.about?.children?.map((item) => (
            <li key={item.id} className={item.position}>
              <button
                type='button'
                onClick={() => openItem(item)}
                className='w-full text-left'>
                <img src={item.icon} alt={`${item.name} icon`} />
                <p>{item.name}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const AboutWindow = WindowWrapper(About, 'about');

export default AboutWindow;
