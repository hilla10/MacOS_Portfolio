import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, 'title');
    const subtitleCleanup = setupTextHover(subtitleRef.current, 'subtitle');

    return () => {
      subtitleCleanup();
      titleCleanup();
    };
  }, []);

  return (
    <section id='welcome'>
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Hailemichael! Welcome to my",
          'text-3xl font-georama',
          100
        )}{' '}
      </p>
      <h1 ref={titleRef} className='mt-7'>
        {renderText('portfolio', 'text-9xl italic font-georama')}
      </h1>

      <div className='small-screen'>
        <p>This Portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
