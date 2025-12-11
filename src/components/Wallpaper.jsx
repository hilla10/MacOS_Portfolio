import { wallpapers } from '@constants';
import useWindowStore from '@store/window';

const Wallpaper = () => {
  const { theme, changeWallpaper, wallpaper } = useWindowStore();

  return (
    <section
      id='wallpaper'
      className='absolute right-4 dark:right-6 dark:md:right-10  top-38 md:top-33 w-50 flex flex-col gap-2  '>
      {wallpapers.map(({ id, mode, img }) => {
        return (
          theme === mode &&
          wallpaper !== img && (
            <button
              key={id}
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                changeWallpaper(img);
              }}
              className='border-0 p-0 bg-transparent'
              aria-label={`Select wallpaper ${id}`}>
              {' '}
              <img
                src={img}
                alt={`wallpaper-${id}`}
                className='w-30 cursor-pointer'
              />
            </button>
          )
        );
      })}
    </section>
  );
};

export default Wallpaper;
