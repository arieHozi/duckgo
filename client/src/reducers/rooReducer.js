import { GET_DATA_FAILURE, FETCH_DATA } from "../actions/types"

const initialState = {
  data: [],
  error: ''
  //history: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case GET_DATA_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}
