import { InputLabel, InputAdornment } from '@mui/material';
import Input from 'components/input';
import { useFormContext } from 'react-hook-form';

const InvoiceExpense = ({ idx }) => {
  const { control } = useFormContext();

  return (
    <div className="expense">
      <div>
        <InputLabel>Description</InputLabel>
        <Input fullWidth rules={{ required: true }} control={control} name={`expenses.${idx}.description`} />
      </div>
      <div>
        <InputLabel>Quantity</InputLabel>
        <Input
          fullWidth
          type="number"
          control={control}
          rules={{ required: true, min: 0 }}
          name={`expenses.${idx}.quantity`}
          placeholder="Hour or pcs"
        />
      </div>
      <div>
        <InputLabel>Amount</InputLabel>
        <Input
          fullWidth
          type="number"
          control={control}
          rules={{ required: true, min: 0 }}
          name={`expenses.${idx}.amount`}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </div>
    </div>
  );
};
export default InvoiceExpense;
