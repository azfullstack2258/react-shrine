import { configure, addDecorator } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
import { withKnobs } from '@storybook/addon-knobs';
import customTheme from '../client/app/theme';

const theme = createMuiTheme(customTheme);

addDecorator(muiTheme([theme]));
addDecorator(withKnobs);

const req = require.context('../client/app/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => {
    return req(filename);
  });
}

configure(loadStories, module);
