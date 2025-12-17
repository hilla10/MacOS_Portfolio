import { Download } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

import { WindowController } from '@components';
import WindowWrapper from '@hoc/WindowWrapper';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import useWindowStore from '@store/window';
import MobileHeader from '@components/MobileHeader';
import { useEffect, useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const Resume = () => {
  const { closeWindow } = useWindowStore();

  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div id='window-header'>
        <WindowController target='resume' />
        <h2>Resume.pdf</h2>

        <a
          href='/files/resume.pdf'
          download
          className='cursor-pointer'
          title='Download Resume'>
          <Download className='icon' />
        </a>
      </div>

      <MobileHeader closeWindow={closeWindow} name='Resume' type='resume' />
      <Document file='/files/resume.pdf'>
        <Page
          pageNumber={1}
          width={pageWidth <= 640 ? pageWidth : 640}
          renderTextLayer={pageWidth > 640}
          renderAnnotationLayer={pageWidth > 640}
        />{' '}
      </Document>

      <div className='footer-gallery'>
        <img src='/mobile/fill-book.png' alt='Fill Book' />
        <img src='/mobile/library.png' alt='Library' />
        <img src='/mobile/audio-book.png' alt='Audio-book' />
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, 'resume');

export default ResumeWindow;
