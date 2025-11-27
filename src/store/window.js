import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '@constants';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

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
    // 🔹 NEW: set the dock icon position for Genie animation
    setDockPosition: (windowKey, position) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.dockPosition = position;
      }),
  }))
);
export default useWindowStore;
