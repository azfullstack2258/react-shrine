import { Field } from 'react-final-form';
import InputField from './InputField';

const FieldInput = ({ label, name, required, autoFocus, placeholder, type }) => (
  <Field
    name={name}
    label={label}
    render={({ input, meta }) => (
      <InputField
        required={required}
        autoFocus={autoFocus}
        placeholder={placeholder}
        input={input}
        type={type}
        meta={meta}
      />
    )}
  />
);

export default FieldInput;
