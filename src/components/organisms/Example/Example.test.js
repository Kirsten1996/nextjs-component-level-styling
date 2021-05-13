import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Example from './';
import data from './__mocks__/exampleData';

it('renders', () => {
  mount(
    <MemoryRouter>
      <Example />
    </MemoryRouter>
  );
});

it('renders with content', () => {
  mount(
    <MemoryRouter>
      <Example {...data} />
    </MemoryRouter>
  );
});
