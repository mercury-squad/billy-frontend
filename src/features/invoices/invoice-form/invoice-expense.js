import { InputLabel, TextField, InputAdornment } from '@mui/material';

const InvoiceExpense = ({ data = { description: '', quantity: '', amount: '' }, onChange }) => {
  const handleOnChange = (e) => {
    const { name, value } = e?.target ?? {};
    const newData = {
      ...data,
      [name]: name !== 'description' ? Number(value) : value,
    };
    onChange(newData);
  };
  return (
    <div className="expense">
      <div>
        <InputLabel>Description</InputLabel>
        <TextField fullWidth name="description" value={data.description || ''} onChange={handleOnChange} />
      </div>
      <div>
        <InputLabel>Quantity</InputLabel>
        <TextField
          fullWidth
          type="number"
          name="quantity"
          placeholder="Hour or pcs"
          value={data.quantity || 0}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <InputLabel>Amount</InputLabel>
        <TextField
          fullWidth
          type="number"
          name="amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={data.amount || 0}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};
export default InvoiceExpense;
