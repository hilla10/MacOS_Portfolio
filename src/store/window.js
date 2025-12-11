import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '@constants';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

let initialTheme = 'light';
let initialWallpaper = '/images/wallpaper-light.png';
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    const t = window.localStorage.getItem('theme');
    const w = window.localStorage.getItem('wallpaper');
    if (t) initialTheme = t;
    if (w) initialWallpaper = w;
  }
} catch {
  // Ignore and keep defaults
}

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    theme: initialTheme,
    isClicked: false,
    wallpaper: initialWallpaper,

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
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),
    focusWindow: (windowKey) =>
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
