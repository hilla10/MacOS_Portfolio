import dayjs from 'dayjs';
import { mobileWallpaper, navIcons, navLinks, wallpapers } from '@constants';
import useWindowStore from '@store/window';
import { Check, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

const FALLBACKS = {
  desktop: {
    dark: '/images/wallpaper-dark.png',
    light: '/images/wallpaper-light.png',
  },
  mobile: {
    dark: '/mobile/wallpaper/wallpaper-apple-dark.jpg',
    light: '/mobile/wallpaper/wallpaper-light.png',
  },
};

const TimeDisplay = ({ format, className }) => {
  const [time, setTime] = useState(dayjs().format(format));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format(format));
    }, 1000);
    return () => clearInterval(interval);
  }, [format]);

  return <time className={className}>{time}</time>;
};

const Navbar = () => {
  const {
    openWindow,
    toggleTheme,
    theme,
    toggleDropdown,
    isClicked,
    changeWallpaper,
  } = useWindowStore();
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const setThemeAndWallpaper = (newTheme) => {
    if (newTheme !== theme) {
      toggleTheme(newTheme);
    }

    applyWallpaperForTheme(newTheme, isMobileScreen);
  };

  const applyWallpaperForTheme = useCallback(
    (currentTheme, isMobile) => {
      const source = isMobile ? mobileWallpaper : wallpapers;
      const filtered = source.filter((w) => w.mode === currentTheme);

      if (filtered.length) {
        const random = filtered[Math.floor(Math.random() * filtered.length)];
        changeWallpaper(random.img);
      } else {
        changeWallpaper(
          FALLBACKS[isMobile ? 'mobile' : 'desktop'][currentTheme]
        );
      }
    },
    [changeWallpaper]
  );

  const isDark = theme === 'dark';
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;

      setIsMobileScreen((prev) => {
        if (prev !== isMobile) {
          // screen type changed → update wallpaper
          applyWallpaperForTheme(theme, isMobile);
        }
        return isMobile;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme]);

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
        <TimeDisplay format='dd MMM D h:mm:ss A' className='max-sm:hidden' />
        <TimeDisplay format='h:mm:ss A' className='sm:hidden' />
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
