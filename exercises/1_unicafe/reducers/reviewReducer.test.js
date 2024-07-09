import deepFreeze from 'deep-freeze';
import reviewReducer from './reviewReducer';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test('should return a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = reviewReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented', () => {
    const action = {
      type: 'GOOD_REVIEW',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = reviewReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test('bad is decremented', () => {
    const action = {
      type: 'BAD_REVIEW',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = reviewReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test('ok is recorded', () => {
    const action = {
      type: 'OK_REVIEW',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = reviewReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });
});
