import { combineReducers } from 'redux'

import common from '../ducks/common'
import auth from '../ducks/auth'
import list from '../ducks/list'


export const rootReducer = combineReducers({
    common,
    auth,
    list
});

