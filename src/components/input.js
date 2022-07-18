import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const errorMessage = ({ type }, rules) => {
  const messages = {
    required: 'This field is required',
    min: `Value must be greater or equal to ${rules?.min}`,
    max: `Value must be greater or equal to ${rules?.max}`,
  };

  return messages[type];
};

const Input = ({ name, control, rules, onChange: providedOnChange, defaultValue = '', ...otherProps }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
        <TextField
          {...otherProps}
          onBlur={onBlur}
          onChange={(val) => {
            onChange(val);
            providedOnChange?.(val);
          }}
          checked={value}
          value={value}
          inputRef={ref}
          error={!!error}
          helperText={error ? error.message || errorMessage(error, rules) : otherProps.helperText}
        />
      )}
    />
  );
};

export default Input;