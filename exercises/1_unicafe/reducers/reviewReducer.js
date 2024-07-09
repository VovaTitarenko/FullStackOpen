const reviewReducer = (state = { good: 0, ok: 0, bad: 0 }, action) => {
  switch (action.type) {
    case 'GOOD_REVIEW':
      return { ...state, good: state.good + 1 };
    case 'OK_REVIEW':
      return { ...state, ok: state.ok + 1 };
    case 'BAD_REVIEW':
      return { ...state, bad: state.bad + 1 };
    case 'RESET':
      return { good: 0, ok: 0, bad: 0 };
    default:
      return state;
  }
};

export default reviewReducer;
