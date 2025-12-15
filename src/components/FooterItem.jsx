import clsx from 'clsx';

const FooterItem = ({ label, icon, isActive, onClick }) => (
  <button
    type='button'
    className={clsx('flex items-center gap-2', isActive && 'opacity-40 ')}
    disabled={isActive}
    onClick={onClick}
    aria-pressed={isActive}>
    <img src={icon} alt={label} className='block' />
    {label}
  </button>
);
export default FooterItem;
