import clsx from 'clsx';
const FALLBACK_IMAGE = '/images/image.png';
const RenderList = ({
  name,
  items,
  setActiveLocation,
  activeLocation,
  setInput,
  resetSearch,
}) => {
  return (
    <div>
      <h3>{name}</h3>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setActiveLocation(item);
              setInput('');
              resetSearch();
            }}
            className={clsx(
              item.id === activeLocation?.id ? 'active' : 'not-active'
            )}>
            {' '}
            <img
              src={item.icon || FALLBACK_IMAGE}
              className='w-4'
              alt={item.name}
              onError={(e) => {
                e.target.src = FALLBACK_IMAGE;
              }}
            />
            <p className='text-sm font-medium truncate'>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderList;
