import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const reducer = (state = {
  currPlayer: 'X',
  matrix: [
    [ null, null, null ],
    [ null, null, null ],
    [ null, null, null ],
  ],
}, action) => {
  if (action.type !== 'MATRIX_MOVE') {
    return state;
  }

  // TODO: chequear si alguien ha ganado...

  return {
    ...state,
    currPlayer: (state.currPlayer === 'X') ? 'O' : 'X',
    matrix: state.matrix.map(
      (row, x) => row.map((col, y) => (
        (x === action.payload.x && y === action.payload.y)
          ? state.currPlayer
          : col
      ))
    ),
  };
};

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
