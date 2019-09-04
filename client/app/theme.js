import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

const baseObject = {
  palette: {
    // Add our white label primary color to common ones
    common: {
      black: '#000000',
      white: '#FFFFFF',
      error: '#AA0202',
      grey: {
        ...grey,
        100: '#C7C7C7',
        200: '#C1C1C1',
        300: '#BFBFBF',
        400: '#AFAFAF',
        500: '#878787',
        600: '#21B6A8',
        700: '#555555',
        800: '#343434',
        900: '#707070',
        A100: 'rgba(0, 0, 0, 0.16)',
        A200: 'rgba(0, 0, 0, 0.35)',
        A300: 'rgba(0, 0, 0, 0.40)',
      },
      blue: {
        ...blue,
        100: '#274070',
        200: '#293F6F',
        300: '#133360',
      },
      green: {
        ...green,
        500: '#21B6A8',
      },
    },
    primary: {
      highlight: '#762256',
      default: '#343434',
      main: '#343434',
      contrastText: 'white',
      error: '#e01c1c',
    },
    secondary: {
      main: '#21B6A8',
      contrastText: 'white',
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
    },
  },
  overrides: {
    MuiButton: {
      containedSecondary: {
        fontFamily: 'Montserrat',
        fontWeight: 600,
        '&:hover': {
          backgroundColor: '#21B6A8',
        },
      },
      containedPrimary: {
        fontFamily: 'Montserrat',
        fontWeight: 600,
        '&:hover': {
          backgroundColor: '#343434',
        },
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#AFAFAF',
      },
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'Oswald', 'Roboto'],
    useNextVariants: true,
  },
};

export default baseObject;
