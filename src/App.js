import React from 'react';
import { connect } from 'react-redux';

const styles = {
  matrix: {
    display: 'flex',
    width: 300,
    height: 300,
  },
  col: {
    width: 100,
    height: 100,
    border: '1px solid yellow',
    background: 'pink',
  },
};

const MatrixRow = ({ row, x, onClick }) => (
  <div>
    {row.map((col, y) => (
      <div
        style={styles.col}
        key={`col-${x}-${y}`}
        onClick={onClick(x, y)}
      >{col}</div>
    ))}
  </div>
);

const Matrix = props => (
  <div style={styles.matrix}>
    {props.matrix.map((row, x) => (
      <MatrixRow
        key={`row-${x}`}
        row={row}
        x={x}
        onClick={(x, y) => () => props.dispatch({
          type: 'MATRIX_MOVE',
          payload: { x, y },
        })}
      />
    ))}
  </div>
);

export const App = (props) => (
  <div className="app">
    <div>Jugador: {props.currPlayer}</div>
    <Matrix {...props} />
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  matrix: state.matrix,
  currPlayer: state.currPlayer,
});

export default connect(mapStateToProps)(App);
