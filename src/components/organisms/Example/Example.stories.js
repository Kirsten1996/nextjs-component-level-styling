import React from 'react';
import ReactMarkdown from 'react-markdown';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Example from './';
import data from './__mocks__/exampleData';

import info from './README.md';

storiesOf('Styleguide/Organisms/Example', module)
  .addDecorator(withKnobs)
  .add('_notes', () => <ReactMarkdown source={info} escapeHtml={false} />)
  .add('<dynamic>', () => <Example />)
  .add('default', () => <Example {...data} />);
