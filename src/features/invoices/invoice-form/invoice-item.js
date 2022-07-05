import { InputLabel, TextField, InputAdornment } from '@mui/material';

const InvoiceItem = ({ data = { description: '', quantity: '', price: '', amount: '' }, onChange }) => {
  const handleOnChange = (e) => {
    const { name, value } = e?.target ?? {};
    const newData = {
      ...data,
      [name]: name !== 'description' ? Number(value) : value,
    };
    onChange(newData);
  };
  return (
    <div className="item">
      <div>
        <InputLabel>Description</InputLabel>
        <TextField fullWidth name="description" value={data.description} onChange={handleOnChange} />
      </div>
      <div>
        <InputLabel>Quantity</InputLabel>
        <TextField
          fullWidth
          type="number"
          name="quantity"
          placeholder="Hour or pcs"
          value={data.quantity}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <InputLabel>Price</InputLabel>
        <TextField
          fullWidth
          type="number"
          name="price"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={data.price}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <InputLabel>Amount</InputLabel>
        <TextField
          fullWidth
          InputProps={{
            readOnly: true,
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={data.price * data.quantity}
        />
      </div>
    </div>
  );
};
export default InvoiceItem;
