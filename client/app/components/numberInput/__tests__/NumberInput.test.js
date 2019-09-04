/* global describe, beforeAll, it, expect */
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { createShallow } from '@material-ui/core/test-utils';
import Wrapper, { NumberInput } from '../index';

configure({ adapter: new Adapter() });

describe('NumberInput', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow({ untilSelector: NumberInput });
  });

  it('renders correctly', () => {
    const initial = 1;
    const min = 1;
    const max = 5;
    const wrapper = shallow(<Wrapper initial={initial} min={min} max={max} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
