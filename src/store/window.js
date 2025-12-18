import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '@constants';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import useLocationStore from './location';

const useWindowStore = create(
  immer((set, get) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    theme: 'light',
    isClicked: false,
    wallpaper: '/images/wallpaper-light.png',
    isSearching: false,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
        win.minimize = false;
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        const { resetSearch } = useLocationStore.getState();
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
        // Only reset search for search-related windows
        if (windowKey === 'search' || windowKey === 'finder') {
          resetSearch();
        }
      }),    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.zIndex = state.nextZIndex++;
      }),
    maximizeWindow: (windowKey) => {
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.maximize = !win.maximize;
      });
    },
    minimizeWindow: (windowKey) => {
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.minimize = true;
        win.isOpen = false;
      });
    },

    openItem: (item) => {
      const { setActiveLocation } = useLocationStore.getState();
      const { openWindow } = get();
      if (item.fileType === 'pdf') return openWindow('resume');

      if (item.kind === 'folder') return setActiveLocation(item);

      if (['fig', 'url'].includes(item.fileType) && item.href)
        return window.open(item.href, '_blank');
      openWindow(`${item.fileType}${item.kind}`, item);
    },

    toggleTheme: (theme) => {
      set((state) => {
        state.theme = theme;

        // Toggle dark class on <html> when running in the browser
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', theme === 'dark');
        }

        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('theme', theme);
          }
        } catch {
          // ignore storage errors
        }
      });
    },

    changeWallpaper: (wallpaper) => {
      set((state) => {
        state.wallpaper = wallpaper;

        // Ensure proper CSS format
        const cssBg = `url('${wallpaper}')`;

        // Apply wallpaper only in browser
        if (typeof document !== 'undefined') {
          document.documentElement.style.backgroundImage = cssBg;
          if (document.body) document.body.style.backgroundImage = cssBg;
        }

        // Save wallpaper safely
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('wallpaper', wallpaper);
          }
        } catch {
          // ignore storage errors
        }
      });
    },

    toggleDropdown: (id) => {
      set((state) => {
        // Theme icon ID = 4
        if (id === 4) {
          state.isClicked = !state.isClicked;
        } else {
          // Clicking anything else closes dropdown
          state.isClicked = false;
        }
      });
    },

    closeDropdown: () => set({ isClicked: false }),
  }))
);
export default useWindowStore;

export const rehydrateWindowStoreFromLocalStorage = () => {
  if (typeof window === 'undefined') return;

  try {
    const t = window.localStorage.getItem('theme');
    const w = window.localStorage.getItem('wallpaper');
    const state = useWindowStore.getState();

    if (t) state.toggleTheme(t);
    if (w) state.changeWallpaper(w);
  } catch {
    // ignore any storage errors
  }
};
