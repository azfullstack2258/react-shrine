import React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';

import { withLogin } from '../../providers/Auth';
import Auth from 'app/utils/auth';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  container: {
    maxWidth: 1240,
    margin: 'auto',
    padding: 20,
  },
  paper: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    margin: theme.spacing.unit,
  },
});

@withStyles(styles, { withTheme: true })
@withLogin
class SignIn extends React.Component {
  state = {
    err: '',
    proceeding: false,
    email: '',
    password: '',
  };
  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };
  handleSubmit = e => {
    const { email, password } = this.state;
    e.preventDefault();

    this.props
      .login({
        variables: {
          email,
          password,
        },
      })
      .then(res => {
        const { data } = res;
        const { token, fullName, email } = data.login;

        Auth.setUser(fullName, token, email);

        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ err: err.message.replace('GraphQL error: ', ''), proceeding: false });
      });
  };
  render() {
    const { classes } = this.props;
    const { email, password } = this.state;

    return (
      <div className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={this.handleChange('email')}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={this.handleChange('password')}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
