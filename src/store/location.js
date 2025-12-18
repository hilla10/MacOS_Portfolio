import { locations } from '@constants';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import useWindowStore from './window';

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    // controlledInput: current value of the search input (controlled form state)
    controlledInput: '',
    // committedSearch: last committed search term (e.g., Enter pressed)
    committedSearch: '',
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
      if (e.key !== 'Enter') return;
      if (!input.trim()) return;

      // We'll capture an item that should be opened here, but perform the
      // side effect (openItem) *after* the set() updater completes to keep
      // the updater pure and avoid race conditions.
      let itemToOpen = null;

      set((state) => {
        // Commit the search term and sync controlled input
        state.committedSearch = input;
        state.controlledInput = input;

        const children = activeLocation?.children || [];
        const query = input.toLowerCase();

        // Find all matches in current folder
        const matches = children.filter((item) =>
          item.name.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
          state.isProjectFound = false;
          state.filtered = null;
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
          // Mark file to open after updater
          state.shouldOpenItem = match;
        } else {
          state.shouldOpenItem = match; // fallback
        }

        // Capture and clear shouldOpenItem inside the updater (no side effects)
        if (state.shouldOpenItem) {
          itemToOpen = state.shouldOpenItem;
          state.shouldOpenItem = null;
        }
      });

      // Perform the side effect outside the updater
      if (itemToOpen) {
        useWindowStore.getState().openItem(itemToOpen);
      }
    },

    handleChange: (value) =>
      set((state) => {
        // Update controlled input only
        state.controlledInput = value;
        state.isProjectFound = false;
      }),

    resetSearch: () => {
      set((state) => {
        state.committedSearch = '';
        state.filtered = null;
        state.isProjectFound = true;
        state.controlledInput = '';
      });
    },
  }))
);

export default useLocationStore;
