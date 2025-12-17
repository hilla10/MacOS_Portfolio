import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { widget } from '@constants';
import MobileDock from './MobileDock';
import { Search, X } from 'lucide-react';
import useWindowStore from '@store/window';
import { toggleApp } from '@utils/toggleApp';

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
      {char === ' ' ? '\u00a0' : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = Array.from(container.querySelectorAll('span'));
  const { min, max, default: base } = FONT_WEIGHTS[type];

  // Fast path: set a CSS transition for smoother visual change
  // and reduce layout thrashing by writing style only once per RAF frame
  letters.forEach((el) => {
    el.style.transition = 'font-variation-settings 160ms linear';
  });

  // Cache centers relative to container
  let containerLeft = container.getBoundingClientRect().left;
  const letterData = letters.map((letter) => {
    const rect = letter.getBoundingClientRect();
    return {
      element: letter,
      center: rect.left - containerLeft + rect.width / 2,
    };
  });

  const recomputeRects = () => {
    containerLeft = container.getBoundingClientRect().left;
    letterData.forEach((d) => {
      const rect = d.element.getBoundingClientRect();
      d.center = rect.left - containerLeft + rect.width / 2;
    });
  };

  // Use requestAnimationFrame to batch updates on pointer move
  let lastMouseX = null;
  let isTicking = false;
  let rafId = null;

  const run = () => {
    if (lastMouseX == null) {
      isTicking = false;
      return;
    }

    const mouseX = lastMouseX;
    letterData.forEach(({ element, center }) => {
      // Simple distance-based intensity, same formula as before
      const distance = Math.abs(mouseX - center);
      const intensity = Math.exp(-(distance ** 2) / 2000);
      const weight = Math.round(min + (max - min) * intensity);
      element.style.fontVariationSettings = `'wght' ${weight}`;
    });

    isTicking = false;
    lastMouseX = null;
  };

  const handleMouseMove = (e) => {
    lastMouseX = e.clientX - containerLeft;
    if (!isTicking) {
      isTicking = true;
      rafId = requestAnimationFrame(run);
    }
  };

  const handleMouseLeave = () => {
    // Reset to base weight with a single GSAP animation for all letters.
    gsap.to(letters, {
      duration: 0.3,
      fontVariationSettings: `'wght' ${base}`,
      stagger: 0.02,
    });
  };

  // Recompute on resize and scroll
  const handleResize = () => recomputeRects();
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleResize, { passive: true });

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', handleResize);
    if (rafId) cancelAnimationFrame(rafId);
  };
};

const Welcome = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const [input, setInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, 'title');
    const subtitleCleanup = setupTextHover(subtitleRef.current, 'subtitle');

    return () => {
      subtitleCleanup();
      titleCleanup();
    };
  }, []);

  const filteredWidgets = widget.filter((item) =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <section id='welcome'>
      <p ref={subtitleRef} className='medium-screen'>
        {renderText(
          "Hey, I'm Hailemichael! Welcome to my",
          'text-3xl font-georama',
          100
        )}{' '}
      </p>
      <h1 ref={titleRef} className='mt-7 medium-screen'>
        {renderText('portfolio', 'text-9xl italic font-georama')}
      </h1>

      <div className='small-screen'>
        <div className='widget'>
          {/* {filteredWidgets?.map(({ id, name, icon }) => (
            <img
              src={icon}
              alt={name}
              key={id}
              onClick={() =>
                toggleApp(id, filteredWidgets, windows, openWindow, closeWindow)
              }
            />
          ))} */}

          {filteredWidgets?.map(({ id, name, icon }) => (
            <img
              src={icon}
              alt={name}
              key={id}
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
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
        <div
          className={`search ${
            isSearching ? 'p-2 w-86 mb-2 transition-all duration-300' : ''
          } `}
          onClick={() => setIsSearching(true)}>
          {isSearching ? (
            <>
              <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='bg-transparent outline-none w-full px-2 py-1 text-lg'
              />
              <X
                className='icon size-10'
                onClick={(e) => {
                  setIsSearching(false);
                  e.stopPropagation();
                  setInput('');
                }}
              />
            </>
          ) : (
            <>
              <Search className='icon' />
              <span>Search</span>
            </>
          )}
        </div>
        <MobileDock />
      </div>
      <div className='extra-small-device'>
        <img
          src='/images/header-image-xs-screen.png'
          alt='Extra small screen device image'
        />
        <h3>Hey there! Is this a portfolio for ants? 🐜</h3>
        <small>
          My layout can’t breathe down here 😭 Hop on a larger phone, laptop, or
          desktop to unlock the main character arc 🖥️✨
        </small>
      </div>
    </section>
  );
};

export default Welcome;
