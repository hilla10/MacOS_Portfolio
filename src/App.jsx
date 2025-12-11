import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);
import useWindowStore, {
  rehydrateWindowStoreFromLocalStorage,
} from '@store/window';
import { useEffect } from 'react';

import { Dock, Home, Navbar, Welcome } from '@components';
import {
  Contact,
  Finder,
  Gallery,
  Image,
  Resume,
  Safari,
  Terminal,
  Text,
} from '@windows';
import Wallpaper from '@components/Wallpaper';

const App = () => {
  const { toggleTheme, changeWallpaper, isClicked, closeDropdown } =
    useWindowStore();

  useEffect(() => {
    // Populate store from persisted client storage after hydration
    try {
      rehydrateWindowStoreFromLocalStorage();
    } catch (error) {
      console.error('Failed to rehydrate store from localStorage:', error);
    }
  }, []);
  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      document.documentElement.classList.add('dark');
      toggleTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      toggleTheme('light');
    }
  }, [toggleTheme]);

  useEffect(() => {
    const saved = localStorage.getItem('wallpaper');
    if (saved) {
      changeWallpaper(saved);
    }
  }, [changeWallpaper]);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        e.target.closest("[data-dropdown-toggle='4']") ||
        e.target.closest('#wallpaper') ||
        e.target.closest('#dropdown')
      ) {
        return;
      }

      closeDropdown();
    };

    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [closeDropdown]);

  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Home />
      <Gallery />
      {isClicked && <Wallpaper />}
    </main>
  );
};

export default App;
