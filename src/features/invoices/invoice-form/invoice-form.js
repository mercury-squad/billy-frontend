import { useEffect } from 'react';
import moment from 'moment';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useOutletContext, useNavigate, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, MenuItem, Button, InputLabel, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Input from 'components/input';

import Section from 'components/section/section';
import { DATE_FORMAT, API, ROUTES } from 'common/constants';
import { getProjects } from 'features/projects/projects-slice';
import styles from './invoice-form.module.scss';
import InvoiceItem from './invoice-item';
import InvoiceExpense from './invoice-expense';
import server from '../../../common/server';

const PAGE_TITLE = 'New Invoice';
const InvoiceForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    state: { ...invoice },
  } = useLocation();
  const [setHeaderTitle] = useOutletContext();
  const currentDate = moment().format(DATE_FORMAT);
  const projectsList = useSelector((state) => state.projects.results);
  const paymentMethods = useSelector((state) => state.user.paymentOptions);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      status: invoice.status || 'draft',
      notes: invoice.notes || '',
      items: invoice.items?.map(({ _id, ...data }) => data) || [{}],
      expenses: invoice.expenses?.map(({ _id, ...data }) => data) || [{}],
      totalAmount: invoice.totalAmount || 0,
      paymentDueDate: moment(invoice.paymentDueDate).format(DATE_FORMAT) || moment().add(1, 'week').format(DATE_FORMAT),
      generatedDate: moment(invoice.generatedDate).format(DATE_FORMAT) || currentDate,
      paymentType: invoice.paymentType?.name || 'default',
      project: invoice.project?._id || 'default',
    },
  });
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = methods;
  const { fields: itemsCollection, append: appendItem } = useFieldArray({
    control,
    name: 'items',
  });
  const { fields: expensesCollection, append: appendExpense } = useFieldArray({
    control,
    name: 'expenses',
  });
  const [items, expenses, project, paymentType, generatedDate] = watch([
    'items',
    'expenses',
    'project',
    'paymentType',
    'generatedDate',
  ]);
  useEffect(
    () => setHeaderTitle(invoice._id ? `Edit Invoice ${invoice.invoiceNumber}` : PAGE_TITLE),
    [setHeaderTitle, invoice],
  );
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const getTotalAmount = () => {
    const itemsTotal = items.reduce((prev, cur) => prev + (Number(cur.price) * Number(cur.quantity) || 0), 0);
    const expensesTotal = expenses.reduce((prev, cur) => prev + (Number(cur.amount) || 0), 0);
    const total = itemsTotal + expensesTotal;
    setValue('totalAmount', total);
    return total;
  };

  const addNewItem = (key) => {
    if (key === 'items') {
      appendItem({ description: '', quantity: '', price: '', amount: '' });
    } else {
      appendExpense({ description: '', price: '', amount: '' });
    }
  };

  const saveInvoice = (type, callback, event) => {
    event.preventDefault();
    const createInvoice = async ({ generatedDate: oldGeneratedData, ...data }) => {
      const issueDate = {
        sent: currentDate,
        draft: null,
        preview: null,
        schedule: oldGeneratedData,
      };
      const { _id, ...paymentTypeObj } = paymentMethods.find((method) => method.name === data.paymentType) || {};
      const body = {
        ...data,
        paymentType: paymentTypeObj,
        ...(issueDate[type] ? { generatedDate: issueDate[type] } : {}),
        status: type === 'preview' ? 'draft' : type,
      };
      let res;
      if (invoice._id) {
        res = await server.put(`${API.invoices}/${invoice._id}`, body);
      } else {
        res = await server.post(`${API.invoices}?type=${type === 'scheduled' ? 'draft' : type}`, body);
      }
      if (res.status === 200) {
        callback(res.data?.document);
      }
    };
    if (type === 'sent') {
      setValue('generatedDate', '');
    }
    handleSubmit(createInvoice)();
  };

  const selectedProject = projectsList.find(({ _id: id }) => id === project);
  const clientSectionProps = { fullWidth: true, InputProps: { readOnly: true } };

  if (!projectsList.length || !paymentMethods.length) {
    return (
      <div className="flex justify-center align-center h-100">
        <CircularProgress />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.invoiceForm}>
        <Section title="Invoice" className="section-base">
          <div>
            <InputLabel>Project</InputLabel>
            <Input
              select
              fullWidth
              placeholder="Project"
              name="project"
              control={control}
              rules={{
                validate: (value) => projectsList.find(({ _id: id }) => id === value) || 'This field is required',
              }}>
              <MenuItem value="default">Select Project</MenuItem>
              {projectsList.map(({ _id: id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Input>
          </div>
          <div>
            <InputLabel>Due Date</InputLabel>
            <Input
              fullWidth
              name="paymentDueDate"
              placeholder="Due Date"
              type="date"
              control={control}
              rules={{ required: true, min: currentDate }}
            />
          </div>
        </Section>

        <Section title="Items" className="section-items">
          <div className="items">
            {itemsCollection.map((item, idx) => (
              <InvoiceItem
                // eslint-disable-next-line react/no-array-index-key
                key={item.id}
                idx={idx}
                data={item}
              />
            ))}
          </div>
          <Button
            className="new-item-button"
            variant="text"
            startIcon={<AddIcon />}
            onClick={() => addNewItem('items')}>
            Add New Item
          </Button>
        </Section>

        <Section title="Additional Expenses" className="section-expenses">
          <div className="expenses">
            {expensesCollection.map((expense, idx) => (
              <InvoiceExpense
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                idx={idx}
              />
            ))}
          </div>
          <Button
            className="new-expense-button"
            variant="text"
            startIcon={<AddIcon />}
            onClick={() => addNewItem('expenses')}>
            Add New Expense
          </Button>
        </Section>

        <Section title="Amount Due" className="section-total">
          <span>Amount due</span>
          <span className="h2">$ {getTotalAmount()}</span>
        </Section>

        <Section title="Bill to" className="section-billing">
          <TextField {...clientSectionProps} placeholder="Client" value={selectedProject?.client?.name ?? ''} />
          <TextField
            {...clientSectionProps}
            placeholder="Contact person"
            value={selectedProject?.client?.contactPerson ?? ''}
          />
          <TextField {...clientSectionProps} placeholder="Email" value={selectedProject?.client?.email ?? ''} />
          <TextField
            {...clientSectionProps}
            placeholder="Contact number"
            value={selectedProject?.client?.phoneNumber ?? ''}
          />
          <TextField {...clientSectionProps} placeholder="Adress" value={selectedProject?.client?.address ?? ''} />
        </Section>

        <Section title="Payment" className="section-payment">
          <Input
            select
            fullWidth
            placeholder="Payment Method"
            name="paymentType"
            control={control}
            rules={{ validate: (value) => value !== 'default' || 'This field is required' }}>
            <MenuItem value="default">Select a Payment Method</MenuItem>
            {paymentMethods.map((method) => (
              <MenuItem key={method.name} value={method.name}>
                {method.name}
              </MenuItem>
            ))}
          </Input>
          {paymentMethods[paymentType]?.name && (
            <div className="account-info">
              <span>Account Info</span>
              <span>{paymentMethods[paymentType].details}</span>
            </div>
          )}
        </Section>

        <Section title="Notes" className="section-notes">
          <Input fullWidth multiline rows={4} placeholder="Notes" name="notes" control={control} />
        </Section>
        <div className="section-finale">
          <Button
            type="submit"
            variant="outlined"
            onClick={(e) => saveInvoice('draft', () => navigate(ROUTES.invoices), e)}>
            Save as Draft
          </Button>
          <Button
            type="submit"
            variant="outlined"
            onClick={(e) => saveInvoice('preview', ({ _id }) => navigate(`${ROUTES.invoices}/${_id}`), e)}>
            Preview
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={(e) =>
              saveInvoice(
                'sent',
                (data) =>
                  navigate(ROUTES.sentInvoice, {
                    state: { email: selectedProject?.client?.email, invoiceNumber: data?.invoiceNumber },
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
      </form>
    </FormProvider>
  );
};

export default InvoiceForm;
