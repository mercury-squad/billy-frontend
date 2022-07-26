import { InputLabel, InputAdornment, IconButton } from '@mui/material';
import Input from 'components/input';
import { useFormContext } from 'react-hook-form';
import { ReactComponent as DeleteIcon } from 'assets/img/delete-icon.svg';

const InvoiceItem = ({ position, onRemove }) => {
  const { control, setValue, getValues } = useFormContext();
  const handleOnChange = () => {
    const { price = 0, quantity = 0 } = getValues(`items.${position}`);
    setValue(`items.${position}.amount`, price * quantity);
  };
  return (
    <div className="item">
      <div>
        <InputLabel>Description</InputLabel>
        <Input control={control} fullWidth rules={{ required: true }} name={`items.${position}.description`} />
      </div>
      <div>
        <InputLabel>Quantity</InputLabel>
        <Input
          fullWidth
          type="number"
          control={control}
          rules={{ required: true, min: 0 }}
          InputProps={{ inputProps: { min: 0 } }}
          name={`items.${position}.quantity`}
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
          name={`items.${position}.price`}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputProps: { min: 0 },
          }}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <div className="amount">
          <InputLabel>Amount</InputLabel>
          <Input
            fullWidth
            type="number"
            control={control}
            name={`items.${position}.amount`}
            InputProps={{
              readOnly: true,
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
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
export default InvoiceItem;
