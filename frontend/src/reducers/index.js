import { combineReducers } from 'redux';

import appReducer from './appReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  app: appReducer,
  profile: profileReducer,
})

export default rootReducer