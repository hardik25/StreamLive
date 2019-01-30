import { SIGN_IN, SIGN_OUT, CREATE_STREAM, EDIT_STREAM, GET_ALL_STREAMS, GET_STREAM, DELETE_STREAM } from './types';
import streams from '../api/streams';
import history from '../history';

export const signIn = (userID) => {
  return {
    type: SIGN_IN,
    payload: userID
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = (formValues) => {
  return async (dispatch, getState) => {
       const { userID } = getState().auth;
       const response = await streams.post('/streams', { ...formValues, userID });
       dispatch({ type: CREATE_STREAM, payload: response.data });
       history.push('/');
  };
};

export const editStream = (id, formValues) => {
  return async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
  };
};

export const getAllStreams = () => {
  return async (dispatch) => {
    const response = await streams.get('/streams');
    dispatch({ type: GET_ALL_STREAMS, payload: response.data });
  };
};

export const getStream = (id) => {
  return async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: GET_STREAM, payload: response.data });
  };
};

export const deleteStream = (id) => {
  return async (dispatch) => {
    await streams.delete(`/streams/${id}`);
    dispatch({type: DELETE_STREAM, payload: id});
    history.push('/');
  };
};
