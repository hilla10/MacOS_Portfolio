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
    input: '',

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
      if (e.key !== 'Enter') return;
      if (!input.trim()) return;

      set((state) => {
        state.searchInput = input;

        const children = activeLocation?.children || [];
        const query = input.toLowerCase();

        // Find all matches in current folder
        const matches = children.filter((item) =>
          item.name.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
          state.isProjectFound = false;
          state.filtered = [];
          return;
        }

        // Pick first match
        const match = matches[0];
        state.filtered = match;
        state.isProjectFound = true;

        if (match.kind === 'folder') {
          // Navigate into folder
          state.activeLocation = match;
          state.shouldOpenItem = null;
        } else if (match.kind === 'file') {
          // Open file immediately
          state.shouldOpenItem = match;
        } else {
          state.shouldOpenItem = match; // fallback
        }

        if (state.shouldOpenItem) {
          const { openItem } = useWindowStore.getState();
          openItem(state.shouldOpenItem);
          state.shouldOpenItem = null;
        }
      });
    },

    handleChange: (value) =>
      set((state) => {
        state.input = value;
        state.isProjectFound = false;
      }),

    resetSearch: () => {
      set((state) => {
        state.searchInput = '';
        state.filtered = null;
        state.isProjectFound = true;
        state.input = '';
      });
    },
  }))
);

export default useLocationStore;
