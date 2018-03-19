import React from 'react';
import { connect } from 'react-redux';
import InfoBar from './InfoBar';
import Matrix from './Matrix';
import End from './End';

const styles = {
  app: {
    position: 'relative',
  },
};

export const App = props => (
  <div className="app" style={styles.app}>
    {(props.winner || props.isDraw) && <End {...props} />}
    <InfoBar {...props} />
    <Matrix {...props} />
  </div>
);

export default connect(
  ({ currPlayer, winner, winnerCombination, isDraw, matrix }) => ({
    currPlayer,
    winner,
    winnerCombination,
    isDraw,
    matrix,
  }),
  dispatch => ({
    move: (x, y) => dispatch({ type: 'MOVE', payload: { x, y } }),
    reset: () => dispatch({ type: 'RESET' }),
  }),
)(App);
