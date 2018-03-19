import React from 'react';
import MatrixRow from './MatrixRow';

const styles = {
  matrix: {
    display: 'flex',
    width: 300,
    height: 300,
    marginTop: 10,
  },
};

export default props => (
  <div style={styles.matrix}>
    {props.matrix.map((row, x) => (
      <MatrixRow
        key={`row-${x}`}
        row={row}
        x={x}
        onClick={(x, y) => () => props.move(x, y)}
        winnerCombination={props.winnerCombination}
      />
    ))}
  </div>
);
