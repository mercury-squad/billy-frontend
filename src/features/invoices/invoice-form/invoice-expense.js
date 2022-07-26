import { InputLabel, InputAdornment, IconButton } from '@mui/material';
import Input from 'components/input';
import { useFormContext } from 'react-hook-form';
import { ReactComponent as DeleteIcon } from 'assets/img/delete-icon.svg';

const InvoiceExpense = ({ position, onRemove = () => {} }) => {
  const { control } = useFormContext();

  return (
    <div className="expense">
      <div>
        <InputLabel>Description</InputLabel>
        <Input fullWidth control={control} rules={{ required: true }} name={`expenses.${position}.description`} />
      </div>
      <div className="amount">
        <div>
          <InputLabel>Amount</InputLabel>
          <Input
            fullWidth
            type="number"
            control={control}
            rules={{ required: true, min: 0 }}
            name={`expenses.${position}.amount`}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              inputProps: { min: 0 },
            }}
          />
        </div>
        <div className="delete-icon">
          <IconButton onClick={() => onRemove(position)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
export default InvoiceExpense;
