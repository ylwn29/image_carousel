import { pdf } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import { saveAs } from 'file-saver';

export const downloadPagesAsPDF = async (pages) => {
  const blob = await pdf(<PDFDocument pages={pages} />).toBlob();
  saveAs(blob, 'carousel-pages.pdf');
};

export const downloadPageAsPDF = async (page) => {
  const blob = await pdf(<PDFDocument pages={[page]} />).toBlob();
  saveAs(blob, 'carousel-page.pdf');
};
