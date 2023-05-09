import React from 'react';
import ReactDOM from 'react-dom';
import RootApplication from '../app';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RootApplication />, div);
    // ReactDOM.unmountComponentAtNode(div)
});
