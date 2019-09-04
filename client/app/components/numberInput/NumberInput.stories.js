import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import Wrapper from './index';

storiesOf('Components/Number Input', module).add('Default', () => {
  const min = number('min', 1);
  const max = number('max', undefined);

  return <Wrapper initial={1} min={min} max={max} />;
});
