import { useEffect, useState } from 'react';
import moment from 'moment';
import { useOutletContext, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, MenuItem, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
  const [setHeaderTitle] = useOutletContext();
  const projectsList = useSelector((state) => state.projects.results);
  const paymentMethods = useSelector((state) => state.user.paymentOptions);
  const [formData, setFormData] = useState({
    generatedDate: moment().format(DATE_FORMAT),
    paymentDueDate: moment().format(DATE_FORMAT),
    status: 'draft',
    // eslint-disable-next-line no-underscore-dangle
    project: 'default',
    items: [{}],
    expenses: [{}],
    paymentType: 'default',
    totalAmount: 0,
  });

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleOnChange = (e) => {
    const { name, value } = e?.target ?? {};
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const addNewItem = (key) => {
    setFormData((prevData) => ({ ...prevData, [key]: [...prevData.items, {}] }));
  };

  const saveInvoice = (type, callback) => {
    const createInvoice = async () => {
      const res = await server.post(`${API.invoices}?type=${type}`, formData);
      if (res.status === 200) {
        const { _id: id } = res.data?.document ?? {};
        callback(id);
      }
    };
    createInvoice();
  };

  const getTotalAmount = (data) => {
    const itemsTotal = data.items.reduce((prev, cur) => prev + (cur.price * cur.quantity || 0), 0);
    const expensesTotal = data.expenses.reduce((prev, cur) => prev + (cur.amount || 0), 0);
    return itemsTotal + expensesTotal;
  };

  const selectedProject = projectsList.find(({ _id: id }) => id === formData.project);
  const clientSectionProps = { fullWidth: true, InputProps: { readOnly: true } };
  return (
    <div className={styles.invoiceForm}>
      <Section title="Invoice" className="section-base">
        <TextField
          select
          fullWidth
          placeholder="Project"
          name="project"
          value={formData.project}
          onChange={handleOnChange}>
          <MenuItem value="default">Select Project</MenuItem>
          {projectsList.map(({ _id: id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          name="paymentDueDate"
          placeholder="Due Date"
          type="date"
          value={formData.paymentDueDate}
          onChange={handleOnChange}
        />
      </Section>

      <Section title="Items" className="section-items">
        <div className="items">
          {formData.items.map((item, idx) => (
            <InvoiceItem
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              data={Object.keys(item).length ? item : undefined}
              onChange={(itemData) =>
                setFormData((prevData) => {
                  const items = [...prevData.items];
                  items[idx] = { ...itemData, amount: itemData.quantity * itemData.price };
                  const newFormData = { ...prevData, items };
                  const totalAmount = getTotalAmount(newFormData);
                  return { ...newFormData, totalAmount };
                })
              }
            />
          ))}
        </div>
        <Button className="new-item-button" variant="text" startIcon={<AddIcon />} onClick={() => addNewItem('items')}>
          Add New Item
        </Button>
      </Section>

      <Section title="Additional Expenses" className="section-expenses">
        <div className="expenses">
          {formData.expenses.map((expense, idx) => (
            <InvoiceExpense
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              data={Object.keys(expense).length ? expense : undefined}
              onChange={(expenseData) =>
                setFormData((prevData) => {
                  const expenses = [...prevData.expenses];
                  expenses[idx] = expenseData;
                  const newFormData = { ...prevData, expenses };
                  const totalAmount = getTotalAmount(newFormData);
                  return { ...newFormData, totalAmount };
                })
              }
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
        <span className="h2">$ {formData.totalAmount}</span>
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
        <TextField
          select
          fullWidth
          placeholder="Payment Method"
          name="paymentType"
          value={formData.paymentType}
          onChange={handleOnChange}>
          <MenuItem value="default">Select a Payment Method</MenuItem>
          {paymentMethods.map((method) => (
            <MenuItem key={method.name} value={method}>
              {method.name}
            </MenuItem>
          ))}
        </TextField>
        {formData.paymentType.name && (
          <div className="account-info">
            <span>Account Info</span>
            <span>{formData.paymentType.details}</span>
          </div>
        )}
      </Section>

      <Section title="Notes" className="section-notes">
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleOnChange}
        />
      </Section>
      <div className="section-finale">
        <Button variant="outlined" onClick={() => saveInvoice('draft', () => navigate(ROUTES.invoices))}>
          Save as Draft
        </Button>
        <Button variant="outlined" onClick={() => saveInvoice('preview', (id) => navigate(`${ROUTES.invoices}/${id}`))}>
          Preview
        </Button>
        <Button variant="contained" onClick={() => saveInvoice('sent', () => navigate(ROUTES.invoices))}>
          Send Now
        </Button>
      </div>
    </div>
  );
};

export default InvoiceForm;
