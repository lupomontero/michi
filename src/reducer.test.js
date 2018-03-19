import reducer from './reducer';

describe('reducer', () => {

  it('debería ser una función', () => {
    expect(typeof reducer).toBe('function');
  });

  it('debería retornar el estado inicial cuando no recibe estado', () => {
	  expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('debería empezar con jugador X y cambiar turno después de mover', () => {
	  expect(reducer(undefined, { type: 'MOVE', payload: { x: 0, y: 0 } })).toMatchSnapshot();
  });

  it('no debería dejar marcar una casilla ya marcada', () => {
    const state1 = reducer(undefined, { type: 'MOVE', payload: { x: 1, y: 1 } });
    const state2 = reducer(state1, { type: 'MOVE', payload: { x: 1, y: 1 } });
    expect(state2).toMatchSnapshot();
  });

  it('debería marcar casilla de O en su turno', () => {
    const state1 = reducer(undefined, { type: 'MOVE', payload: { x: 0, y: 0 } });
	  expect(reducer(state1, { type: 'MOVE', payload: { x: 1, y: 0 } })).toMatchSnapshot();
  });

  it('debería resetear estado cuando acción es RESET', () => {
    const state1 = reducer(undefined, { type: 'MOVE', payload: { x: 0, y: 0 } });
    const state2 = reducer(state1, { type: 'MOVE', payload: { x: 1, y: 0 } });
    expect(reducer(state2, { type: 'RESET' })).toMatchSnapshot();
  });

  it('debería detectar combinación ganadora en eje X');

  it('debería detectar combinación ganadora en eje Y');

  it('debería detectar diagonal (0,0) -> (2,2)', () => {
    const state1 = reducer(undefined, { type: 'MOVE', payload: { x: 0, y: 0 } });
    const state2 = reducer(state1, { type: 'MOVE', payload: { x: 0, y: 1 } });
    const state3 = reducer(state2, { type: 'MOVE', payload: { x: 1, y: 1 } });
    const state4 = reducer(state3, { type: 'MOVE', payload: { x: 1, y: 0 } });
    const state5 = reducer(state4, { type: 'MOVE', payload: { x: 2, y: 2 } });
    expect(state5).toMatchSnapshot();
  });

  it('debería detectar diagonal (0,2) -> (2,0)');

  it('debería detectar empate');

});
