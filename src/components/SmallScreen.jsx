import { widget } from '@constants';
import useWindowStore from '@store/window';
import { toggleApp } from '@utils/toggleApp';
import React, { useState } from 'react';
import MobileDock from './MobileDock';
import { Search, X } from 'lucide-react';
const SmallScreen = ({ filteredWidgets, input, setInput }) => {
  const { windows, openWindow, closeWindow } = useWindowStore();
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className='small-screen'>
      {/* SCROLLABLE CONTENT */}
      <div className='widget relative'>
        <div>
          {filteredWidgets?.map(({ id, name, icon }) => (
            <img
              key={id}
              src={icon}
              alt={name}
              role='button'
              tabIndex={0}
              onClick={() =>
                toggleApp(id, widget, windows, openWindow, closeWindow)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleApp(id, widget, windows, openWindow, closeWindow);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM AREA */}
      <div className='container'>
        <div
          className={`search ${isSearching ? 'active-search' : ''}`}
          onClick={() => setIsSearching(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsSearching(true);
            }
          }}
          role='button'
          tabIndex={isSearching ? -1 : 0}
          aria-label='Activate search'>
          <div className='search-layer flex items-center w-full'>
            {/* Icon stays put or moves slightly */}
            <Search
              aria-hidden='true'
              className={`icon  transition-all duration-300  ${
                isSearching ? 'scale-90 opacity-70' : 'scale-80'
              }`}
            />
            {/* Text fades out while Input expands */}
            <div
              className={`relative flex-1 flex items-center overflow-hidden ${
                !isSearching && 'cursor-pointer'
              }`}>
              <span
                className={`ml-1 transition-all duration-300 absolute left-0 ${
                  isSearching
                    ? 'opacity-0 -translate-x-2'
                    : 'opacity-100 translate-x-0'
                }`}>
                Search
              </span>
              <input
                autoFocus={isSearching}
                placeholder='Search apps...'
                aria-label='Search applications'
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onBlur={() => {
                  if (input === '') setIsSearching(false);
                }}
                className={`search-input ${
                  isSearching ? 'w-full opacity-100 ml-2' : 'w-0 opacity-0'
                }`}
              />{' '}
            </div>

            {/* Close Button */}
            {isSearching && (
              <button
                aria-label='Clear search and close'
                onClick={(e) => {
                  e.stopPropagation();
                  setInput('');
                  setIsSearching(false);
                }}
                className='ml-auto transition-opacity duration-300'>
                <X aria-hidden='true' className='icon' />
              </button>
            )}
          </div>
        </div>

        {/* 🔥 DOCK */}
        <MobileDock />
      </div>
    </div>
  );
};

export default SmallScreen;
