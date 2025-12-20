import { wallpapers } from '@constants';
import useWindowStore from '@store/window';

const Wallpaper = () => {
  const { theme, changeWallpaper, wallpaper } = useWindowStore();

  return (
    <section id='wallpaper'>
      {wallpapers.map(({ id, mode, img, isPhoneScreen }) => {
        return (
          !isPhoneScreen &&
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
