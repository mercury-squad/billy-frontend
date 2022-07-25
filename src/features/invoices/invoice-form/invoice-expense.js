import { InputLabel, InputAdornment } from '@mui/material';
import Input from 'components/input';
import { useFormContext } from 'react-hook-form';

const InvoiceExpense = ({ idx }) => {
  const { control } = useFormContext();

  return (
    <div className="expense">
      <div>
        <InputLabel>Description</InputLabel>
        <Input fullWidth control={control} rules={{ required: true }} name={`expenses.${idx}.description`} />
      </div>
      <div>
        <InputLabel>Quantity</InputLabel>
        <Input
          fullWidth
          type="number"
          control={control}
          rules={{ min: 0 }}
          InputProps={{ inputProps: { min: 0 } }}
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
          rules={{ min: 0 }}
          name={`expenses.${idx}.amount`}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputProps: { min: 0 },
          }}
        />
      </div>
    </div>
  );
};
export default InvoiceExpense;
