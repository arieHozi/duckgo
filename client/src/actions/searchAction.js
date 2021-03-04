import { GET_DATA_FAILURE, FETCH_DATA } from "./types"
import axios from 'axios'


export const getDuckData = (parameter) => (dispatch) => {
  axios.get("/api/duck/" + parameter)
    .then((response) => {
      dispatch({
        type: FETCH_DATA,
        payload: response.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_DATA_FAILURE,
        payload: err
      })
    })

}
