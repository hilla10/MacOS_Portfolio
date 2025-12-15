import clsx from 'clsx';

const FooterItem = ({ label, icon, isActive, onClick }) => (
  <p
    className={clsx(
      'flex items-center gap-2',
      isActive && 'opacity-40 pointer-events-none'
    )}
    onClick={!isActive ? onClick : undefined}>
    <img src={icon} alt={label} />
    {label}
  </p>
);
export default FooterItem;
