import _ from 'lodash';
import
{
  GET_ALL_STREAMS,
  GET_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  CREATE_STREAM
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_STREAM:
      return {...state, [action.payload.id]: action.payload};
    case CREATE_STREAM:
      return {...state, [action.payload.id]: action.payload};
    case EDIT_STREAM:
      return {...state, [action.payload.id]: action.payload};
    case GET_ALL_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, 'id')};
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
