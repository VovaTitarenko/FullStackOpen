export default function filterReducer(state = '', action) {
  if (action.type === 'UPDATE_FILTER') {
    return action.payload;
  }
  return state;
}

export const filterAnecdotesBy = (str) => {
  return {
    type: 'UPDATE_FILTER',
    payload: str,
  };
};
