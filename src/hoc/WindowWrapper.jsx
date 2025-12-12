import { useGSAP } from '@gsap/react';
import useWindowStore from '@store/window';
import clsx from 'clsx';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useLayoutEffect, useRef } from 'react';

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();

    const { isOpen, zIndex, maximize } = windows[windowKey];
    const ref = useRef(null);
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = 'block';
      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const [instance] = Draggable.create(el, {
        type: 'x,y',
        onPress: () => focusWindow(windowKey),
        disable: maximize,
        allowEventDefault: true,
        ignore: 'input, textarea, .search, .search *',
      });

      return () => instance.kill();
    }, []);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? 'block' : 'none';
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={clsx(
          'absolute',
          maximize
            ? 'top-10!  left-0! max-w-full! w-full! h-full transform-none!'
            : ''
        )}>
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || 'Component'
  })`;

  return Wrapped;
};

export default WindowWrapper;
