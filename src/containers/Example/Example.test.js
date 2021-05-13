import React from 'react';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import Example from './';
import theme from '../../theme/index';

// it(
it('shallow renders without crashing', () => {
  shallow(<Example />);
});
