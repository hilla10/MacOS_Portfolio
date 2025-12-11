import dayjs from 'dayjs';
import { navIcons, navLinks, wallpapers } from '@constants';
import useWindowStore from '@store/window';
import { Check } from 'lucide-react';
import clsx from 'clsx';

const Navbar = () => {
  const {
    openWindow,
    toggleTheme,
    theme,
    toggleDropdown,
    isClicked,
    changeWallpaper,
  } = useWindowStore();

  const setThemeAndWallpaper = (newTheme) => {
    const filtered = wallpapers.filter((w) => w.mode === newTheme);

    if (filtered.length > 0) {
      const random = filtered[Math.floor(Math.random() * filtered.length)];

      // 2. Switch theme
      toggleTheme(newTheme);

      // 3. Apply wallpaper
      changeWallpaper(random.img);
    }
  };

  return (
    <nav>
      <div>
        <img
          src={theme === 'dark' ? '/images/logo-light.svg' : '/images/logo.svg'}
          alt='Mac logo'
        />
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
          {navIcons.map(({ id, img, imgLight }) => (
            <li key={id}>
              <img
                src={theme === 'light' ? img : imgLight}
                alt={`icon-${id}`}
                className='icon-hover'
                data-dropdown-toggle={id}
                onClick={() => toggleDropdown(id)}
              />
            </li>
          ))}

          <div
            id='dropdown'
            className='dropdown'
            style={{ display: isClicked ? 'flex' : 'none' }}>
            <div className='glass-arrow' />
            <div className='card'>
              <p
                className={clsx(
                  'mt-1',
                  theme === 'light' && 'flex-between bg-[#007AFF] text-white'
                )}
                onClick={() => setThemeAndWallpaper('light')}>
                Light Mode
                {theme === 'light' && <Check className='size-5 ' />}
              </p>

              <p
                className={clsx(
                  theme === 'dark' && 'flex-between bg-[#007AFF] text-white'
                )}
                onClick={() => setThemeAndWallpaper('dark')}>
                Dark Mode {theme === 'dark' && <Check className='size-5 ' />}
              </p>
            </div>
          </div>
        </ul>

        <time>{dayjs().format('dd MMM D h:mm A')}</time>
      </div>
    </nav>
  );
};

export default Navbar;
