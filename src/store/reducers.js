import {CURRENT_IMAGE_ID} from './constants';

const initialState = {
    currentImageId: null,
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === CURRENT_IMAGE_ID) {
      return Object.assign({}, state, {
        currentImageId: action.payload
      });
    }
    return state;
  };
  
  export default rootReducer;