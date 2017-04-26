import {config} from './db_setting'
import {rootReducer} from '../reducers'


const URL = config.databaseURL;

export const getList = URL;
console.log(rootReducer);