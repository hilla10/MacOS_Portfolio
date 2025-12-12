const navLinks = [
  {
    id: 1,
    name: 'Projects',
    type: 'finder',
  },
  {
    id: 3,
    name: 'Contact',
    type: 'contact',
  },
  {
    id: 4,
    name: 'Resume',
    type: 'resume',
  },
];

const navIcons = [
  {
    id: 1,
    img: '/icons/wifi.svg',
    imgLight: '/icons/wifi-light.svg',
  },
  {
    id: 2,
    img: '/icons/search.svg',
    imgLight: '/icons/search-light.svg',
  },
  {
    id: 3,
    img: '/icons/user.svg',
    imgLight: '/icons/user-light.svg',
  },
  {
    id: 4,
    img: '/icons/mode.svg',
    imgLight: '/icons/mode-light.svg',
  },
];

const wallpapers = [
  {
    id: 1,
    mode: 'dark',
    img: '/images/wallpaper-dark.png',
  },
  {
    id: 2,
    mode: 'dark',
    img: '/images/wallpaper-glow-dark.jpg',
  },
  {
    id: 3,
    mode: 'dark',
    img: '/images/wallpaper-dark-apple.jpg',
  },
  {
    id: 4,
    mode: 'dark',
    img: '/images/wallpaper-dark-blue.jpeg',
  },
  {
    id: 5,
    mode: 'dark',
    img: '/images/wallpaper-dark-mac.jpeg',
  },
  {
    id: 6,
    mode: 'light',
    img: '/images/wallpaper-glow-light.png',
  },
  {
    id: 7,
    mode: 'light',
    img: '/images/wallpaper-light.png',
  },
  {
    id: 8,
    mode: 'light',
    img: '/images/wallpaper-mba-light.png',
  },
  {
    id: 9,
    mode: 'light',
    img: '/images/wallpaper-light-blue.jpg',
  },
  {
    id: 10,
    mode: 'light',
    img: '/images/wallpaper-light-mac.jpg',
  },
];

const dockApps = [
  {
    id: 'finder',
    name: 'Portfolio', // was "Finder"
    icon: 'finder.png',
    canOpen: true,
  },
  {
    id: 'safari',
    name: 'Articles', // was "Safari"
    icon: 'safari.png',
    canOpen: true,
  },
  {
    id: 'photos',
    name: 'Gallery', // was "Photos"
    icon: 'photos.png',
    canOpen: true,
  },
  {
    id: 'contact',
    name: 'Contact', // or "Get in touch"
    icon: 'contact.png',
    canOpen: true,
  },
  {
    id: 'terminal',
    name: 'Skills', // was "Terminal"
    icon: 'terminal.png',
    canOpen: true,
  },
  {
    id: 'trash',
    name: 'Trash',
    icon: 'trash.png',
    canOpen: true,
  },
];

const blogPosts = [
  {
    id: 1,
    date: 'Sep 2, 2025',
    title:
      'TypeScript Explained: What It Is, Why It Matters, and How to Master It',
    image: '/images/blog1.png',
    link: 'https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it',
  },
  {
    id: 2,
    date: 'Aug 28, 2025',
    title: 'The Ultimate Guide to Mastering Three.js for 3D Development',
    image: '/images/blog2.png',
    link: 'https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development',
  },
  {
    id: 3,
    date: 'Aug 15, 2025',
    title: 'The Ultimate Guide to Mastering GSAP Animations',
    image: '/images/blog3.png',
    link: 'https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations',
  },
];

const techStack = [
  {
    category: 'Frontend',
    items: ['React.js', 'TypeScript'],
  },
  {
    category: 'Styling',
    items: ['Tailwind CSS', 'Sass', 'CSS', 'Bootstrap'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'PHP', 'Python'],
  },
  {
    category: 'Database',
    items: ['MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    category: 'Dev Tools',
    items: ['Git', 'GitHub', 'Docker'],
  },
];

const socials = [
  {
    id: 1,
    text: 'Github',
    icon: '/icons/github.svg',
    bg: '#f4656b',
    link: 'https://github.com/hilla10',
  },
  {
    id: 2,
    text: 'Instagram',
    icon: '/icons/instagram.webp',
    bg: '#405de6',
    link: 'https://www.instagram.com/hillaman592',
  },
  {
    id: 3,
    text: 'Twitter/X',
    icon: '/icons/twitter.svg',
    bg: '#ff866b',
    link: 'https://x.com/man_hilla',
  },
  {
    id: 4,
    text: 'LinkedIn',
    icon: '/icons/linkedin.svg',
    bg: '#05b6f6',
    link: 'https://www.linkedin.com/in/hailemichaelnegusse/',
  },
];

const photosLinks = [
  {
    id: 1,
    icon: '/icons/gicon1.svg',
    title: 'Library',
  },
  {
    id: 2,
    icon: '/icons/gicon2.svg',
    title: 'Memories',
  },
  {
    id: 3,
    icon: '/icons/file.svg',
    title: 'Places',
  },
  {
    id: 4,
    icon: '/icons/gicon4.svg',
    title: 'People',
  },
  {
    id: 5,
    icon: '/icons/gicon5.svg',
    title: 'Favorites',
  },
];

const gallery = [
  {
    id: 1,
    img: '/images/gal1.jpg',
  },
  {
    id: 2,
    img: '/images/gal2.webp',
  },
  {
    id: 3,
    img: '/images/gal3.png',
  },
  {
    id: 4,
    img: '/images/gal4.png',
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
  wallpapers,
};

const WORK_LOCATION = {
  id: 1,
  type: 'work',
  name: 'Work',
  icon: '/icons/work.svg',
  kind: 'folder',
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: 'Project Management Website Application',
      icon: '/images/folder.png',
      kind: 'folder',
      position: 'top-10 left-5', // icon position inside Finder
      windowPosition: 'top-[5vh] left-7', // optional: Finder window position
      children: [
        {
          id: 1,
          name: 'Project management.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          position: 'top-5 left-10',
          description: [
            'The Project Management Platform is a sleek, modern, and intuitive workspace designed to help teams manage tasks, workspaces, analytics, and users—all within a single, streamlined dashboard.',

            'Rather than feeling like a typical management tool, it delivers a smooth and immersive experience through clean visuals, interactive components, and effortless navigation.',

            'Think of it as the digital equivalent of stepping into a beautifully designed flagship store—elegantly organized to inspire focus and momentum.',

            'Powered by Node.js, React, PostgreSQL (Neon), and Tailwind CSS, the platform offers fast performance, a responsive interface, and a premium, polished look built for productivity and clarity.',
          ],
        },
        {
          id: 2,
          name: 'project-management.com',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'https://project-management-oyk2.vercel.app/',
          position: 'top-10 right-20',
        },
        {
          id: 4,
          name: 'PM.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          position: 'top-52 right-80',
          imageUrl: '/images/project-1.png',
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: 'Online Resume Builder',
      icon: '/images/folder.png',
      kind: 'folder',
      position: 'top-44 left-5',
      windowPosition: 'top-[25vh] left-7',
      children: [
        {
          id: 1,
          name: 'Online Resume Builder Project.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          position: 'top-5 right-10',
          description: [
            'Online Resume Builder is an intelligent, user-friendly platform designed to help you effortlessly create, customize, preview, and share a standout professional resume.',
            'With built-in AI-powered insights, you no longer have to guess what hiring managers are looking for—get real-time suggestions on keywords, structure, formatting, and overall resume impact.',

            'Think of it as your own career mentor: highlighting strengths, refining weaknesses, and significantly increasing your chances of landing interviews.',

            'Built using Node.js, Express, OpenAI, MongoDB, and Tailwind CSS, the system delivers high performance, a clean modern interface, and seamless responsiveness across all devices.',
          ],
        },
        {
          id: 2,
          name: 'online-resume.com',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'https://resume-eta-swart.vercel.app/',
          position: 'top-20 left-20',
        },
        {
          id: 4,
          name: 'online-resume-builder.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          position: 'top-52 left-80',
          imageUrl: '/images/project-2.png',
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: 'PingUp – Connect Beyond Friends',
      icon: '/images/folder.png',
      kind: 'folder',
      position: 'top-10 right-50',
      windowPosition: 'top-[42vh] left-7',
      children: [
        {
          id: 1,
          name: 'PingUp – Connect Beyond Friends Project.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          position: 'top-5 left-10',
          description: [
            'PingUp is a modern social networking platform designed to help users connect, share, and discover within a global community. ',
            'With a clean UI, seamless interactions, and powerful features, PingUp brings a fresh, elegant social experience.',

            "It's built with React.js, Node.js, Express, MongoDB, and TailwindCSS, the system delivers high performance, a clean modern interface, and seamless responsiveness across all devices.",
          ],
        },
        {
          id: 2,
          name: 'PingUp.com',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'https://ping-up-three.vercel.app/',
          position: 'top-10 right-20',
        },
        {
          id: 4,
          name: 'PingUp.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          position: 'top-52 right-80',
          imageUrl: '/images/project-3.png',
        },
      ],
    },
    // ▶ Project 4
    {
      id: 8,
      name: 'Doctor Appointment App',
      icon: '/images/folder.png',
      kind: 'folder',
      position: 'top-44 right-50',
      windowPosition: 'top-[62vh] left-7',
      children: [
        {
          id: 1,
          name: 'Doctor Appointment App Project.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          position: 'top-5 left-10',
          description: [
            'Prescripto — Modern Doctor Appointment & Healthcare Booking System',

            'Prescripto is a full-featured, responsive doctor appointment web application designed to simplify healthcare access for patients and streamline management for medical professionals.',

            'Built with the powerful MERN stack (MongoDB, Express.js, React.js, Node.js), Prescripto delivers a smooth, secure, and intuitive experience across all devices.',

            'With a clean UI, real-time interactions, and efficient data handling, Prescripto offers seamless appointment scheduling, doctor management, and patient-doctor communication—all in one platform.',

            'Use the following credentials to login in as an admin:',

            'Email: admin@prescript.com',
            'Password: admin@123',
          ],
        },
        {
          id: 2,
          name: 'prescripto.com',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'https://prescripto-frontend-snowy.vercel.app/profile',
          position: 'top-10 right-20',
        },
        {
          id: 3,
          name: 'admin prescripto.com',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'https://prescripto-admin-kappa-lovat.vercel.app/',
          position: 'top-40 right-15',
        },
        {
          id: 4,
          name: 'prescripto.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          position: 'top-52 right-105',
          imageUrl: '/images/project-5.png',
        },
        {
          id: 5,
          name: 'prescripto-admin.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          position: 'top-20 right-60',
          imageUrl: '/images/project-05.png',
        },
      ],
    },
    // ▶ Project 5
    {
      id: 9,
      name: 'Brainwave – AI Chat UI Concept',
      icon: '/images/folder.png',
      kind: 'folder',
      position: 'top-78 left-5',
      windowPosition: 'top-[5vh] left-63',
      children: [
        {
          id: 1,
          name: 'Brainwave – AI Chat UI Concept Project.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          position: 'top-5 left-10',
          description: [
            'Brainwave — Modern AI Chat Platform & Intelligent Conversational Interface',

            'Brainwave is a sleek, modern AI chat platform designed to deliver fast, intelligent, and natural conversations through a beautifully crafted user interface.',

            'Inspired by real-world AI assistants like ChatGPT, Brainwave offers a refined front-end experience built with React.js and Tailwind CSS, showcasing smooth animations, responsive layouts, and an elegant, minimal design.',

            'With carefully designed UI components, interactive message flows, and seamless animations, Brainwave provides a polished environment ideal for showcasing AI-powered interactions and conversational tools.',
          ],
        },
        {
          id: 2,
          name: 'brainwave.com',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'https://brainwave-sigma-ten.vercel.app/',
          position: 'top-10 right-20',
        },
        {
          id: 4,
          name: 'brainwave.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          position: 'top-52 right-105',
          imageUrl: '/images/project-4.png',
        },
      ],
    },
    // ▶ Project 6
    {
      id: 10,
      name: 'Spotify Clone – Streaming Platform',
      icon: '/images/folder.png',
      kind: 'folder',
      position: 'top-78 right-50',
      windowPosition: 'top-[25vh] left-63',
      children: [
        {
          id: 1,
          name: 'Spotify Clone – Streaming Platform Project.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          position: 'top-5 left-10',
          description: [
            'Spotify — Full-Stack Music Streaming Platform with Real-Time Playback',

            'Spotify is a modern, full-stack Spotify-like music streaming application designed to deliver seamless audio playback and an immersive listening experience.',

            'Built with Node.js, Express, MongoDB, and React (TypeScript), the platform provides powerful performance, a clean interface, and smooth real-time interactions across all devices.',

            'Featuring real-time music playback, admin-level content management, and integrated live user chat powered by Socket.IO, Spotify combines dynamic features with a polished UI to create a complete streaming ecosystem.',
          ],
        },
        {
          id: 2,
          name: 'Spotify.com',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'https://spotify-u50i.onrender.com/',
          position: 'top-10 right-20',
        },
        {
          id: 4,
          name: 'Spotify.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          position: 'top-52 right-105',
          imageUrl: '/images/project-6.png',
        },
      ],
    },
    // ▶ Project 7
    {
      id: 11,
      name: 'Apple Homepage Clone',
      icon: '/images/folder.png',
      kind: 'folder',
      position: 'top-10 right-5',
      windowPosition: 'top-[45vh] left-63',
      children: [
        {
          id: 1,
          name: 'Apple Homepage Clone Project.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          position: 'top-5 left-10',
          description: [
            'Apple — Responsive Homepage Clone for Modern Web UI Practice',

            'Apple Homepage Clone is a fully responsive, pixel-accurate recreation of the official apple.com landing page, built for learning, practice, and mastering modern frontend development.',

            "Crafted with precision, this project replicates Apple's iconic minimal design, smooth interactions, and clean layout while maintaining responsiveness across all devices.",

            'Built using modern web development tools React.js, GSAP, Three.js, Sentry, and TailwindCSS, the clone highlights your ability to transform complex UI/UX patterns into clean, reusable components and production-ready frontend code.',
          ],
        },
        {
          id: 2,
          name: 'Iphone.com',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'https://iphone-pearl-seven.vercel.app/',
          position: 'top-10 right-20',
        },
        {
          id: 4,
          name: 'Iphone.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          position: 'top-52 right-105',
          imageUrl: '/images/project-7.png',
        },
      ],
    },

    // ▶ Project 8
    {
      id: 12,
      name: 'Quick AI – AI SaaS Platform',
      icon: '/images/folder.png',
      kind: 'folder',
      position: 'top-44 right-5',
      windowPosition: 'top-[62vh] left-63',
      children: [
        {
          id: 1,
          name: 'Quick AI – AI SaaS Platform Project.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          position: 'top-5 left-10',
          description: [
            'Quick AI — Full-Stack AI SaaS Platform for Smart Content Creation & Productivity',

            'Quick AI is a powerful full-stack AI SaaS platform designed to streamline digital workflows with intelligent content generation, advanced image editing, and resume analysis — all within a modern, responsive web interface.',

            'Built with React, Node.js, Clerk, Stripe, and Neon PostgreSQL, Quick AI combines secure authentication, subscription-based billing, and scalable cloud infrastructure to deliver a seamless user experience.',

            'With its elegant UI, fast API responses, and integrated AI tools, Quick AI empowers users to create, enhance, and analyze content effortlessly. From generating text and visuals to evaluating resumes, every feature is built for speed, accuracy, and productivity.',
          ],
        },
        {
          id: 2,
          name: 'Quick.ai.com',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'https://quick-ai-beta-eight.vercel.app/',
          position: 'top-10 right-20',
        },
        {
          id: 4,
          name: 'Quick.ai.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          position: 'top-52 right-105',
          imageUrl: '/images/project-8.png',
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: 'about',
  name: 'About me',
  icon: '/icons/info.svg',
  kind: 'folder',
  children: [
    {
      id: 1,
      name: 'me.png',
      icon: '/images/image.png',
      kind: 'file',
      fileType: 'img',
      position: 'top-10 left-5',
      imageUrl: '/images/haila.jpg',
    },

    {
      id: 3,
      name: 'about-me.txt',
      icon: '/images/txt.png',
      kind: 'file',
      fileType: 'txt',
      position: 'top-60 left-5',
      subtitle: 'Meet the Developer Behind the Code',
      image: '/images/haila.png',
      description: [
        '👋 Hey, I’m Hailemichael Negusse.',
        'I’m a creative full-stack web developer with a strong foundation in software engineering. I specialize in turning complex ideas into fast, responsive, and user-friendly web applications that deliver real business value.',

        'Precision & Performance',

        'I work across the full stack—from crafting sleek, modern front-ends to building robust, scalable back-end systems. I focus on writing clean, maintainable code that solves real-world problems efficiently.',

        'Blending Design & Development',
        'Grounded in both development and design principles (UX/UI), I ensure every project is intuitive, visually appealing, and enjoyable to use. Whether collaborating with cross-functional teams or leading projects independently, I deliver high-quality, impactful web solutions that consistently exceed expectations.',
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: 'resume',
  name: 'Resume',
  icon: '/icons/file.svg',
  kind: 'folder',
  children: [
    {
      id: 1,
      name: 'Resume.pdf',
      icon: '/images/pdf.png',
      kind: 'file',
      fileType: 'pdf',
    },
    {
      id: 2,
      name: 'resume.com',
      icon: '/images/safari.png',
      kind: 'file',
      fileType: 'url',
      href: 'https://drive.google.com/file/d/1A_pEHxc3Fw3u_TQInxqxreCjteMrPJS1/view?usp=sharing',
      position: 'top-7 left-40',
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: 'trash',
  name: 'Trash',
  icon: '/icons/trash.svg',
  kind: 'folder',
  children: [
    {
      id: 1,
      name: 'trash1.png',
      icon: '/images/image.png',
      kind: 'file',
      fileType: 'img',
      position: 'top-10 left-10',
      imageUrl: '/images/trash-1.png',
    },
    {
      id: 2,
      name: 'trash2.png',
      icon: '/images/image.png',
      kind: 'file',
      fileType: 'img',
      position: 'top-40 left-80',
      imageUrl: '/images/trash-2.png',
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    maximize: false,
    minimize: false,
    data: null,
  },
  contact: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    maximize: false,
    minimize: false,
    data: null,
  },
  resume: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    maximize: false,
    minimize: false,
    data: null,
  },
  safari: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    maximize: false,
    minimize: false,
    data: null,
  },
  photos: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    maximize: false,
    minimize: false,
    data: null,
  },
  terminal: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    maximize: false,
    minimize: false,
    data: null,
  },
  txtfile: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    maximize: false,
    minimize: false,
    data: null,
  },
  imgfile: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    maximize: false,
    minimize: false,
    data: null,
  },
  trash: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    maximize: false,
    minimize: false,
    data: null,
  },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
