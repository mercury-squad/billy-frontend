import { InputLabel, InputAdornment } from '@mui/material';
import Input from 'components/input';
import { useFormContext } from 'react-hook-form';

const InvoiceItem = ({ idx }) => {
  const { control, setValue, getValues } = useFormContext();
  const handleOnChange = () => {
    const { price = 0, quantity = 0 } = getValues(`items.${idx}`);
    setValue(`items.${idx}.amount`, price * quantity);
  };
  return (
    <div className="item">
      <div>
        <InputLabel>Description</InputLabel>
        <Input control={control} fullWidth rules={{ required: true }} name={`items.${idx}.description`} />
      </div>
      <div>
        <InputLabel>Quantity</InputLabel>
        <Input
          fullWidth
          type="number"
          control={control}
          rules={{ required: true, min: 0 }}
          InputProps={{ inputProps: { min: 0 } }}
          name={`items.${idx}.quantity`}
          placeholder="Hour or pcs"
          onChange={handleOnChange}
        />
      </div>
      <div>
        <InputLabel>Price</InputLabel>
        <Input
          fullWidth
          type="number"
          control={control}
          rules={{ required: true, min: 0 }}
          name={`items.${idx}.price`}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputProps: { min: 0 },
          }}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <InputLabel>Amount</InputLabel>
        <Input
          fullWidth
          type="number"
          control={control}
          name={`items.${idx}.amount`}
          InputProps={{
            readOnly: true,
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </div>
      {/* {idx > 0 && (
        <div className="delete-icon">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      )} */}
    </div>
  );
};
export default InvoiceItem;
