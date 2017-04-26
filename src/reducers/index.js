import { combineReducers } from 'redux'

import common from '../ducks/common'
import auth from '../ducks/auth'


export const rootReducer = combineReducers({
    common,
    auth
});

