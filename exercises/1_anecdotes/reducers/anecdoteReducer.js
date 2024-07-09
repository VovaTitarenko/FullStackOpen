const initialState = [
  {
    id: 1,
    content: 'Adding manpower to a late software project makes it later!',
    votes: 0,
  },
  {
    id: 2,
    content:
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0,
  },
  {
    id: 3,
    content:
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0,
  },
  {
    id: 4,
    content: 'Premature optimization is the root of all evil.',
    votes: 0,
  },
  {
    id: 5,
    content:
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0,
  },
  {
    id: 6,
    content:
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    votes: 0,
  },
  {
    id: 7,
    content: 'The only way to go fast, is to go well.',
    votes: 0,
  },
  { id: 8, content: 'If it hurts, do it more often.', votes: 0 },
  {
    id: 9,
    content:
      "You might not think that programmers are artists, but programming is an extremely creative profession. It's logic-based creativity.",
    votes: 0,
  },
];

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.payload);
    case 'UPVOTE':
      return state.map((anec) =>
        anec.id !== action.payload.id
          ? anec
          : { ...action.payload, votes: action.payload.votes + 1 },
      );
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const createAnecdote = (content) => {
  const generateId = () => Number((Math.random() * 1000000).toFixed(0));

  return {
    type: 'NEW_ANECDOTE',
    payload: {
      id: generateId(),
      content,
      votes: 0,
    },
  };
};

export const upvoteAnecdote = (object) => {
  return {
    type: 'UPVOTE',
    payload: object,
  };
};

export default anecdoteReducer;
