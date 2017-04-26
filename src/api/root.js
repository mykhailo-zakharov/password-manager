import { config } from './db_setting'
import * as firebase from 'firebase'
export const fireRef = firebase.initializeApp(config);