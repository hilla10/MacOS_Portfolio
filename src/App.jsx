import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);

import { Dock, Navbar, Welcome } from '@components';
import { Finder, Resume, Safari, Terminal } from '@windows';

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
    </main>
  );
};

export default App;
