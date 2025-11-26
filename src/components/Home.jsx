import { locations } from '@constants';
import { useGSAP } from '@gsap/react';
import useLocationStore from '@store/location';
import useWindowStore from '@store/window';
import clsx from 'clsx';
import { Draggable } from 'gsap/Draggable';

const projects = locations.work?.children ?? [];
const Home = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();
  useGSAP(() => {
    Draggable.create('.folder');
  }, []);

  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project);
    openWindow('finder');
  };

  return (
    <section id='home'>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx('group folder', project.windowPosition)}
            onClick={() => handleOpenProjectFinder(project)}>
            <img src='/images/folder.png' alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
