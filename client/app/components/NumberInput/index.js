import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const styles = () => ({
  container: {
    display: 'flex'
  },
  button: {
    minWidth: 40,
    padding: 4
  },
  leftButton: {
    borderRadius: '4px 0px 0px 4px'
  },
  rightButton: {
    borderRadius: '0px 4px 4px 0px'
  },
  input: {
    textAlign: 'center',
    width: 40
  },
  inputRoot: {
    borderTop: '1px solid rgba(0, 0, 0, 0.23)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.23)'
  }
});

export const NumberInput = ({ classes, initial, min, max, onUpdate }) => {
  const [count, setCount] = useState(initial || 0);

  useEffect(() => {
    setCount(initial);
  }, [initial]);

  function increaseCount() {
    if (max) {
      if (count < max) {
        const newCount = count + 1;
        setCount(newCount);
        onUpdate(newCount);
      }
      return;
    }

    const newCount = count + 1;
    setCount(newCount);
    onUpdate(newCount);
  }

  function decreaseCount() {
    if (min) {
      if (count > min) {
        const newCount = count - 1;
        setCount(newCount);
        onUpdate(newCount);
      }
      return;
    }

    const newCount = count - 1;
    setCount(newCount);
    onUpdate(newCount);
  }

  // console.log(count);

  return (
    <div className={classes.container}>
      <Button
        variant="outlined"
        classes={{ root: classes.button, outlined: classes.leftButton }}
        onClick={decreaseCount}
      >
        <RemoveIcon />
      </Button>
      <Input
        disableUnderline
        value={count}
        classes={{
          input: classes.input,
          root: classes.inputRoot
        }}
      />
      <Button
        variant="outlined"
        classes={{ root: classes.button, outlined: classes.rightButton }}
        onClick={increaseCount}
      >
        <AddIcon />
      </Button>
    </div>
  );
};

NumberInput.propTypes = {
  classes: PropTypes.object.isRequired,
  initial: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number
};

NumberInput.defaultProps = {
  initial: 0
};

export default withStyles(styles)(NumberInput);
