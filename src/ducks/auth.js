import { fireRef } from '../api/root'
import {browserHistory} from 'react-router'


export const types = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT: "LOGOUT",
    LOGGED_IN: "LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    CHECK_LOGIN: "CHECK_LOGIN",
    ERROR_LOGIN: "ERROR_LOGIN"
};

export const initialState = {
    useremail: null,
    uid: null,
    status: null
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.LOGOUT:
            return {...state,
                useremail: null,
                uid: null
            };

        case types.LOGIN_USER:
            return {...state,
                useremail: action.useremail,
                uid: action.uid
            };

        case types.REGISTER_USER:
            return {...state,
                useremail: action.useremail,
                uid: action.uid
            };

        case types.CHECK_LOGIN:
            return {...state,
                useremail: action.useremail,
                uid: action.uid
            };

        case types.ERROR_LOGIN:
            return {...state,
                status: "error"
            };

        default:
            return state
    }
}

export const actions = {

    createUserWithEmailAndPassword: function(email, password){
        return function(dispatch,getState){
            fireRef
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((data)=>{
                    console.log("data sing", data);
                    dispatch({
                        type: types.REGISTER_USER,
                        useremail: data.email,
                        uid: data.uid
                    });
                    browserHistory.push(`/`);
                })
                .catch(function(error) {
                    dispatch({type:types.ERROR_LOGIN});
                    alert(error.message);
                });
        }
    },

    signInWithEmailAndPassword: function(email, password){
        return function(dispatch,getState){
            fireRef
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((data)=>{
                    console.log("data sing", data);
                    dispatch({
                        type: types.LOGIN_USER,
                        useremail: data.email,
                        uid: data.uid
                    });
                    browserHistory.push(`/`);
                })
                .catch(function(error) {
                    dispatch({type:types.ERROR_LOGIN});
                    alert(error.message);
                });
        }
    },
    checkLogin: function(){
        return function(dispatch,getState){
                dispatch({type:types.CHECK_LOGIN});

            fireRef
                .auth()
                .onAuthStateChanged(function(user) {
                    if (user) {

                    } else {
                        // User is signed out.
                        dispatch({type:types.ERROR_LOGIN});
                    }
                });
        }
    },
    logoutUser: function(){
        return function(dispatch,getState){
            dispatch({type:types.LOGOUT});
            fireRef.unauth();
        }
    }

}