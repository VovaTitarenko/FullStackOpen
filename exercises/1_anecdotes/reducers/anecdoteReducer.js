import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    upvoteAnecdote(state, action) {
      const id = action.payload;
      const anecToUpvote = state.find((an) => an.id === id);
      const upvotedAnec = { ...anecToUpvote, votes: anecToUpvote.votes + 1 };
      return state.map((an) => (an.id !== id ? an : upvotedAnec));
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { upvoteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const upvoteAnecdoteInDb = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    // console.log('01:', state);
    const anecToUpvote = state.anecdotes.find((an) => an.id === id);
    // console.log('02:', anecToUpvote);
    const upvotedAnec = { ...anecToUpvote, votes: anecToUpvote.votes + 1 };
    const response = await anecdoteService.update(upvotedAnec);
    dispatch(upvoteAnecdote(id));
  };
};

export default anecdoteSlice.reducer;
