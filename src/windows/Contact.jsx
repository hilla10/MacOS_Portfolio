import { WindowController } from '@components';
import { socials } from '@constants';
import WindowWrapper from '@hoc/WindowWrapper';

const Contact = () => {
  return (
    <>
      <div id='window-header'>
        <WindowController target='contact' />
        <h2 className='dark:text-white'>Contact Me</h2>
      </div>

      <div className='p-5 space-y-5'>
        <img
          src='/images/haila.png'
          alt='Hailemichael'
          className='w-20 rounded-full'
        />

        <h3 className='dark:text-white'>Let's Connect</h3>

        <p className='dark:text-white'>
          Got an idea? A bug to squash? Or just wanna talk tech? I'm in.
        </p>

        <p className='dark:text-white'>hillaman592@gmail.com</p>

        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                title={text}>
                <img src={icon} alt={text} className='size-5' />
                <p className='dark:text-white'>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;
