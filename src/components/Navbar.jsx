import dayjs from 'dayjs';
import { navIcons, navLinks, wallpapers } from '@constants';
import useWindowStore from '@store/window';
import { Check, Moon, Sun } from 'lucide-react';
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
    // Always toggle the theme first so UI updates immediately
    toggleTheme(newTheme);

    const filtered = Array.isArray(wallpapers)
      ? wallpapers.filter((w) => w.mode === newTheme)
      : [];

    if (filtered.length > 0) {
      const random = filtered[Math.floor(Math.random() * filtered.length)];
      // Apply a randomly selected wallpaper matching the theme
      changeWallpaper(random.img);
      return;
    }

    // No matching wallpapers found — use a sensible fallback per theme
    const FALLBACKS = {
      light: '/images/wallpaper-light.png',
      dark: '/images/wallpaper-dark.png',
    };

    const fallback = FALLBACKS[newTheme] || FALLBACKS.light;
    console.warn(
      `[Navbar] No wallpapers found for theme "${newTheme}" — applying fallback: ${fallback}`
    );
    changeWallpaper(fallback);
  };

  const isDark = theme === 'dark';

  return (
    <nav>
      <div className='max-sm:justify-start'>
        <img
          src={theme === 'dark' ? '/images/logo-light.svg' : '/images/logo.svg'}
          alt='Mac logo'
        />
        <p className='font-bold max-sm:hidden'>Hailemichael's Portfolio</p>
        <p className='font-bold sm:hidden max-sm:text-sm'>Haila's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='max-sm:justify-end'>
        <ul>
          {navIcons.map(({ id, img, imgLight }) => (
            <li key={id}>
              <img
                src={isDark ? imgLight : img}
                alt={`icon-${id}`}
                className='icon-hover'
                data-dropdown-toggle={id}
                onClick={() => toggleDropdown(id)}
              />
            </li>
          ))}

          <li
            id='dropdown'
            className='dropdown'
            style={{ display: isClicked ? 'flex' : 'none' }}>
            <div className='glass-arrow' />
            <div className='card'>
              <p
                className={clsx(
                  'mt-1',
                  !isDark && 'flex-between bg-[#007AFF] text-white'
                )}
                onClick={() => setThemeAndWallpaper('light')}>
                Light Mode
                {!isDark && <Check className='size-5' />}
              </p>

              <p
                className={clsx(
                  isDark && 'flex-between bg-[#007AFF] text-white'
                )}
                onClick={() => setThemeAndWallpaper('dark')}>
                Dark Mode {isDark && <Check className='size-5' />}
              </p>
            </div>
          </li>
        </ul>
        <time className='max-sm:hidden'>
          {dayjs().format('dd MMM D h:mm A')}
        </time>
        <time className='sm:hidden'>{dayjs().format(' h:mm A')}</time>
        <button
          onClick={() => setThemeAndWallpaper(isDark ? 'light' : 'dark')}
          className='relative size-7 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl sm:hidden'
          aria-label='Toggle theme'>
          <Sun
            className={`absolute size-5 text-yellow-500 transition-all duration-300 ${
              isDark
                ? 'rotate-90 scale-0 opacity-0'
                : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <Moon
            className={`absolute size-5 text-blue-400 transition-all duration-300 ${
              isDark
                ? 'rotate-0 scale-100 opacity-100'
                : '-rotate-90 scale-0 opacity-0'
            }`}
          />
        </button>{' '}
      </div>
    </nav>
  );
};

export default Navbar;
