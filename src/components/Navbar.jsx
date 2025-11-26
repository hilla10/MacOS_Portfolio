import dayjs from 'dayjs';
import { navIcons, navLinks } from '@constants';
import useWindowStore from '@store/window';

const Navbar = () => {
  const { openWindow } = useWindowStore();

  return (
    <nav>
      <div>
        <img src='/images/logo.svg' alt='Mac logo' />
        <p className='font-bold'>Hailemichael's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} className='icon-hover' />
            </li>
          ))}
        </ul>

        <time>{dayjs().format('dd MMM D h:mm A')}</time>
      </div>
    </nav>
  );
};

export default Navbar;
