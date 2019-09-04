import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';

const styles = theme => ({
  field: {
    width: '100%',
    height: 44,
    padding: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    border: `1px solid ${theme.palette.common.grey['900']}`,
    borderRadius: '4px',
    fontSize: 20,
    color: theme.palette.common.grey['900'],

    '&:active, &:focus': {
      borderColor: theme.palette.common.grey['900'],
      color: theme.palette.common.grey['800'],
    },

    '& > div:active': {
      color: theme.palette.common.grey['800'],
    },

    '&.multiline': {
      height: 100,
    },

    '&.error': {
      borderColor: '#AA0202',
      color: '#AA0202',
    },

    'input:placeholder': {
      color: '#707070',
    },
  },
  eyeIcon: {
    cursor: 'pointer',
  },
  formControl: {
    width: '100%',
  },
  error: {
    color: theme.palette.primary.error,
    position: 'absolute',
    bottom: -4,
  },
});

class InputField extends React.Component {
  state = {
    passwordIsMasked: true,
  };

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  render() {
    const {
      classes,
      placeholder,
      required,
      input,
      meta,
      multiline,
      type,
      autoFocus,
      width,
    } = this.props;
    const { passwordIsMasked } = this.state;

    const visibleIcon = passwordIsMasked ? (
      <Visibility className={classes.eyeIcon} onClick={this.togglePasswordMask} />
    ) : (
      <VisibilityOff className={classes.eyeIcon} onClick={this.togglePasswordMask} />
    );

    const newAutoFocus = isWidthDown('xs', width) ? false : autoFocus;

    const endAdornment =
      type === 'password' ? <InputAdornment position="end">{visibleIcon}</InputAdornment> : null;
    return (
      <FormControl className={classes.formControl}>
        <InputBase
          autoFocus={newAutoFocus}
          type={passwordIsMasked && type === 'password' ? 'password' : (type === 'password' ? 'text' : type)} //eslint-disable-line
          className={classNames(
            classes.field,
            multiline ? 'multiline' : '',
            input && input.error ? 'error' : '',
          )}
          placeholder={placeholder}
          required={required}
          endAdornment={endAdornment}
          {...input}
        />
        {meta && meta.error && meta.touched && (
          <FormHelperText className={classes.error}>{meta.error}</FormHelperText>
        )}
      </FormControl>
    );
  }
}

InputField.propTypes = {
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(withWidth({ withTheme: true })(InputField));
