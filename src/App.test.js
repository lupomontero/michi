import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

describe('App', () => {

  it('debería ser una función', () => {
    expect(typeof App).toBe('function');
  });

  it('debería botar error cuando falta matriz', () => {
    const div = document.createElement('div');
    const spy = jest.spyOn(console, 'error').mockImplementation(jest.fn);

    expect(() => ReactDOM.render(<App />, div)).toThrow(Error);
    expect(spy).toHaveBeenCalled();

    ReactDOM.unmountComponentAtNode(div);
    spy.mockReset();
    spy.mockRestore();
  });

  it('debería renderizar un div con className "app"', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <App
        matrix={[
          [null, null, null],
          [null, 'X', null],
          [null, null, null],
        ]}
      />,
      div,
    );

    expect(div.children.length).toBe(1);
    expect(div.children[0].className).toBe('app');

    ReactDOM.unmountComponentAtNode(div);
  });

});
