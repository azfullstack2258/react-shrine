import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

// Low level wrapper for inputs.

const Input = ({ label, children }) => (
  <FormControl style={{ width: '100%' }}>
    <Typography>{label}</Typography>
    {children}
  </FormControl>
);

export default Input;
