import React from 'react';
import ReactDOM from 'react-dom';
import Picrosser from './Picuncrosser';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Picrosser />, div);
  ReactDOM.unmountComponentAtNode(div);
});
