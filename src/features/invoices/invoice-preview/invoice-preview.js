import { useEffect, useState, useRef } from 'react';
import { jsPDF as JsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useParams, useOutletContext } from 'react-router-dom';
import { API } from 'common/constants';
import server from 'common/server';
import { ReactComponent as EditIcon } from 'assets/img/edit-icon.svg';
import { ReactComponent as DownloadIcon } from 'assets/img/download-icon.svg';
import styles from './invoice-preview.module.scss';

const InvoicePreview = () => {
  const { id } = useParams();
  const [preview, setPreview] = useState('');
  const [invoiceData, setInvoiceData] = useState();
  const previewRef = useRef(null);
  const [setHeaderTitle] = useOutletContext();

  useEffect(() => {
    const getPreview = async () => {
      const data = await server.get(`${API.invoices}/${id}`);
      if (data.status === 200) {
        setPreview(data.data?.HTMLContent);
        setInvoiceData(data.data?.document);
        setHeaderTitle(data.data?.document?.invoiceNumber);
      }
    };
    getPreview();
  }, [id, setHeaderTitle]);

  const downloadPDF = () => {
    const filename = `${invoiceData.invoiceNumber}.pdf`;
    const invoice = document.getElementById('invoice-preview-container');
    html2canvas(invoice).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png');
      const pdf = new JsPDF();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);
    });
  };

  return (
    <div className={styles.invoicePreview}>
      <div className="header">
        <h2>Preview</h2>
        <EditIcon onClick={() => console.info('test')} />
        <DownloadIcon onClick={downloadPDF} />
      </div>
      <div
        ref={previewRef}
        id="invoice-preview-container"
        className="preview bg-white"
        dangerouslySetInnerHTML={{ __html: preview }}
      />
    </div>
  );
};

export default InvoicePreview;
