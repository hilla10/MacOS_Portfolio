import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Tooltip } from 'react-tooltip';
import { useRef } from 'react';

import useWindowStore from '@store/window';
import { dockApps } from '@constants';
import { toggleApp } from '@utils/toggleApp';

const Dock = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();

  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;

    if (!dock) return;

    const icons = dock.querySelectorAll('.dock-icon');

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2.5) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: 'power1.out',
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();

      animateIcons(e.clientX - left);
    };

    const resetIcons = () =>
      icons.forEach((icon) =>
        gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: 'power1.out' })
      );

    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', resetIcons);

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', resetIcons);
    };
  }, []);

  return (
    <section id='dock' ref={dockRef}>
      <div className='dock-container'>
        {dockApps.map(({ id, name, icon, canOpen }) => {
          const isAppOpen = windows[id]?.isOpen;
          const isMinimize = windows[id]?.minimize;

          return (
            <div key={id ?? name} className='relative flex justify-center'>
              <button
                type='button'
                className='dock-icon'
                aria-label={name}
                data-tooltip-id='dock-tooltip'
                data-tooltip-content={name}
                data-delay-show={150}
                disabled={!canOpen}
                onClick={() =>
                  toggleApp(id, dockApps, windows, openWindow, closeWindow)
                }>
                <img
                  src={icon}
                  alt='icon'
                  loading='lazy'
                  className={canOpen ? '' : 'opacity-60'}
                />
              </button>

              {(isAppOpen || isMinimize) && (
                <span className='dock-active' aria-hidden='true' />
              )}
            </div>
          );
        })}
        <Tooltip id='dock-tooltip' place='top' className='tooltip' />
      </div>
    </section>
  );
};

export default Dock;
