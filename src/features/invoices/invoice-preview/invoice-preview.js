import { useEffect, useState, useRef } from 'react';
import { jsPDF as JsPDF } from 'jspdf';
import moment from 'moment';
import html2canvas from 'html2canvas';
import { useParams, useOutletContext, useNavigate } from 'react-router';
import { API, DATE_FORMAT, ROUTES } from 'common/constants';
import server from 'common/server';
import { useForm } from 'react-hook-form';
import { ReactComponent as EditIcon } from 'assets/img/edit-icon.svg';
import { ReactComponent as DownloadIcon } from 'assets/img/download-icon.svg';
import { InputLabel, Button, CircularProgress } from '@mui/material';
import Section from 'components/section/section';
import Input from 'components/input';
import styles from './invoice-preview.module.scss';

const InvoicePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState('');
  const [invoiceData, setInvoiceData] = useState();
  const [image, setpImage] = useState('');
  const previewRef = useRef(null);
  const [setHeaderTitle] = useOutletContext();
  const currentDate = moment().format(DATE_FORMAT);
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange', defaultValues: { generatedDate: '' } });
  const generatedDate = watch('generatedDate');

  useEffect(() => {
    if (previewRef?.current && invoiceData) {
      const invoice = document.getElementById('invoice-preview-container');
      html2canvas(invoice).then((canvas) => {
        const dataUrl = canvas.toDataURL('image/png');
        setpImage(dataUrl);
      });
    }
  }, [previewRef, invoiceData]);
  useEffect(() => {
    const getPreview = async () => {
      const data = await server.get(`${API.invoices}/${id}`);
      if (data.status === 200) {
        const invoice = data.data?.document;
        setPreview(data.data?.HTMLContent);
        setInvoiceData(invoice);
        setValue('generatedDate', moment(invoice.generatedDate).format(DATE_FORMAT) || '');
        setHeaderTitle(invoice?.invoiceNumber);
      }
    };
    getPreview();
  }, [id, setHeaderTitle, setValue]);

  const saveInvoice = (type, callback, event) => {
    event.preventDefault();
    const upsertInvoice = async (data) => {
      const issueDate = {
        sent: currentDate,
        schedule: data.generatedDate,
      };
      const body = {
        generatedDate: issueDate[type],
        status: type,
      };
      const res = await server.put(`${API.invoices}/${id}`, body);
      if (res.status === 200) {
        callback(res.data?.document);
      }
    };
    if (type === 'sent') {
      setValue('generatedDate', '');
    }
    handleSubmit(upsertInvoice)();
  };

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

  if (!invoiceData) {
    return (
      <div className="flex justify-center align-center h-100">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.invoicePreview}>
      <div className="preview-header">
        <h2>Preview</h2>
        {invoiceData?.status !== 'sent' && (
          <EditIcon onClick={() => navigate(ROUTES.newInvoice, { state: invoiceData })} />
        )}
        <DownloadIcon onClick={downloadPDF} />
      </div>
      <div>{image && <img className="invoice-preview-img" src={image} alt="" />}</div>
      <div className={`preview-wrapper ${image ? 'hide' : ''}`}>
        <div
          ref={previewRef}
          id="invoice-preview-container"
          className="preview bg-white"
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      </div>
      {invoiceData?.status !== 'sent' && (
        <>
          <div className="section-finale">
            <Button
              type="submit"
              variant="contained"
              onClick={(e) =>
                saveInvoice(
                  'sent',
                  () =>
                    navigate(ROUTES.sentInvoice, {
                      state: { email: invoiceData.project?.client?.email, invoiceNumber: invoiceData.invoiceNumber },
                    }),
                  e,
                )
              }>
              Send Now
            </Button>
          </div>
          <Section title="Schedule (optional)" className="section-schedule">
            <div>
              <InputLabel>Send Date</InputLabel>
              <Input
                fullWidth
                name="generatedDate"
                placeholder="Send Date"
                type="date"
                control={control}
                rules={{ min: currentDate }}
              />
            </div>
            <div>
              <Button
                type="submit"
                variant="contained"
                disabled={!generatedDate || !!errors.generatedDate}
                onClick={(e) => saveInvoice('scheduled', () => navigate(ROUTES.invoices), e)}>
                Schedule
              </Button>
            </div>
          </Section>
        </>
      )}
    </div>
  );
};

export default InvoicePreview;
