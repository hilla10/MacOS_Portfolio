import { WindowController } from '@components';
import { locations } from '@constants';
import WindowWrapper from '@hoc/WindowWrapper';
import useWindowStore from '@store/window';

const Trash = () => {
  const { openItem } = useWindowStore();
  return (
    <>
      <div id='window-header'>
        <WindowController target='trash' />
        <h2 className='dark:text-white'>Trash</h2>
      </div>

      <div className='p-5 space-y-6 bg-white dark:bg-[#1e1e1e]'>
        <ul>
          {locations.trash?.children?.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}>
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const TrashWindow = WindowWrapper(Trash, 'trash');

export default TrashWindow;
