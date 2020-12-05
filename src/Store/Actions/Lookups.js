import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  get: ['id', 'lookup', 'payload'],
  setLoading: ['id'],
  getSuccess: ['id', 'data'],
  getError: ['id', 'error'],
}, {
  prefix: 'lookups/',
});

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({});

/* ------------- Reducers ------------- */
const setLoading = (state, { id }) => state.merge({
  [id]: {
    ...state[id],
    loading: true,
  },
});

const getSuccess = (state, { id, data }) => state.merge({
  ...state.data,
  [id]: {
    loading: false,
    loaded: true,
    data,
  },
});

const getError = (state, { id, error }) => state.merge({
  ...state.data,
  [id]: {
    loading: false,
    error,
  },
});

/* ------------- Reducers ------------- */
export default createReducer(INITIAL_STATE, {
  [Types.SET_LOADING]: setLoading,
  [Types.GET_SUCCESS]: getSuccess,
  [Types.GET_ERROR]: getError,
});
