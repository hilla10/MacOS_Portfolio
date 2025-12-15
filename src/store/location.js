import { locations } from '@constants';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import useWindowStore from './window';

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    searchInput: '',
    filtered: null,
    isProjectFound: true,
    shouldOpenItem: null,
    setActiveLocation: (location) =>
      set((state) => {
        if (location == null) return;
        state.activeLocation = location;
      }),
    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
    search: (e, input, activeLocation) => {
      set((state) => {
        if (e.key !== 'Enter') return;

        if (!input.trim()) return;

        state.searchInput = input;

        if (!activeLocation?.children) {
          state.isProjectFound = false;
          return;
        }

        // Access the root "Work" folder children
        const workItems = activeLocation.children;

        // Case-insensitive partial match
        const match = workItems.find((item) =>
          item.name.toLowerCase().includes(input.toLowerCase())
        );

        if (!match) {
          state.isProjectFound = false;
          return;
        }
        state.filtered = match;
        state.isProjectFound = true;

        if (match.kind === 'folder') {
          state.activeLocation = match;
          return;
        }

        state.shouldOpenItem = match;
      });

      const currentState = useLocationStore.getState();
      if (
        currentState.shouldOpenItem &&
        currentState.shouldOpenItem.kind !== 'folder'
      ) {
        const { openItem } = useWindowStore.getState();
        openItem(currentState.shouldOpenItem);
        set((state) => {
          state.shouldOpenItem = null;
        });
      }
    },
    resetSearch: () => {
      set((state) => {
        state.searchInput = '';
        state.filtered = null;
        state.isProjectFound = true;
      });
    },
  }))
);

export default useLocationStore;
