import { useEffect } from 'react';
import moment from 'moment';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useOutletContext, useNavigate, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, MenuItem, Button, InputLabel, Box, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Input from 'components/input';

import Section from 'components/section/section';
import { DATE_FORMAT, API, ROUTES } from 'common/constants';
import { getProjects } from 'features/projects/projects-slice';
import { cleanupExpenses } from 'common/utils';
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
  const currentDate = moment().utc().format(DATE_FORMAT);
  const { results: projectsList, perPage: projectsPerPage } = useSelector((state) => state.projects);
  const paymentMethods = useSelector((state) => state.user.paymentOptions);
  const email = useSelector((state) => state.user.email);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      status: invoice.status || 'draft',
      notes: invoice.notes || '',
      items: invoice.items?.map(({ _id, ...data }) => data) || [{}],
      expenses: invoice.expenses?.length ? invoice.expenses?.map(({ _id, ...data }) => data) : [{}],
      totalAmount: invoice.totalAmount || 0,
      paymentDueDate: invoice.paymentDueDat
        ? moment(invoice.paymentDueDate).utc().format(DATE_FORMAT)
        : moment().utc().add(1, 'week').format(DATE_FORMAT),
      generatedDate: invoice.generatedDate ? moment(invoice.generatedDate).utc().format(DATE_FORMAT) : '',
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
    const createInvoice = async ({ generatedDate: scheduleDate, ...data }) => {
      const issueDate = {
        sent: currentDate,
        draft: null,
        preview: invoice?.status ? scheduleDate : null,
        scheduled: scheduleDate,
      };
      const { _id, ...paymentTypeObj } = paymentMethods.find((method) => method.name === data.paymentType) || {};
      const body = {
        ...data,
        expenses: cleanupExpenses(data.expenses),
        paymentType: paymentTypeObj,
        ...(issueDate[type] ? { generatedDate: issueDate[type] } : {}),
        status: type === 'preview' ? invoice.status || 'draft' : type,
      };
      let res;
      if (invoice._id) {
        res = await server.put(`${API.invoices}/${invoice._id}`, body);
      } else {
        res = await server.post(`${API.invoices}?type=${type === 'scheduled' ? 'draft' : type}`, body);
      }
      if (res.status === 200) {
        const invoiceDocument = res.data?.document ? res.data.document : res.data;
        callback(invoiceDocument);
      }
    };
    if (type === 'sent') {
      setValue('generatedDate', '');
    }
    handleSubmit(createInvoice)();
  };

  const selectedProject = projectsList.find(({ _id: id }) => id === project);
  const clientSectionProps = { fullWidth: true, InputProps: { readOnly: true } };

  // Still waiting for the API response
  if (!email || projectsPerPage === null) {
    return (
      <div className="flex justify-center align-center h-100">
        <CircularProgress />
      </div>
    );
  }

  if (projectsList.length === 0) {
    const classes = `${styles.no_data} flex justify-center align-center h-100`;
    return (
      <div className={classes}>
        <Box className="subtitle">No Projects have been created yet</Box>
        <Box sx={{ p: '.5rem 0 2rem' }}>
          You need to create a project attached to a client before creating an invoice
        </Box>
        <Button
          sx={{ textTransform: 'initial' }}
          type="submit"
          variant="contained"
          onClick={() => navigate(ROUTES.newProjects)}>
          Create a Project
        </Button>
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
            onClick={(e) => saveInvoice('preview', (data) => navigate(`${ROUTES.invoices}/${data._id}`), e)}>
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
