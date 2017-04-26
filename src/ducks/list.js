import { config } from '../api/db_setting'
const URL = config.databaseURL;


export const types = {
    GET_LIST: "GET_LIST",
    DEL_ITEM: "DEL_ITEM",
    EDIT_ITEM: "EDIT_ITEM",
    ADD_ITEM: "ADD_ITEM",
    SAVE_ITEM: "SAVE_ITEM"
};

export const initialState = {
    list: []
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.GET_LIST:
            return {...state,
                list: action.data,
            };

        case types.DEL_ITEM:
            return {...state};

        case types.EDIT_ITEM:
            return {...state};

        case types.ADD_ITEM:
            return {...state};

        case types.SAVE_ITEM:
            return {...state};

        default:
            return state
    }
}


export const actions = {

    getList: function(uid){
        return function(dispatch,getState){

            let link = `${URL}/${uid}.json?print=pretty`,
                options = {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                };

            fetch(link, options)
                .then(function (response) {
                    return response.json();
                })
                .then((data)=>{
                    console.log(data);
                    let list = [];
                    for(let i in data) {
                        // list.push({name: i, password: data[i]});
                        list.push(Object.assign({},data[i], {id:i}));
                    }
                    dispatch({type:types.GET_LIST, data: list});
                })
                .catch((error)=>console.log(error));

        }
    },

    addItem: function(newName, NewPw, uid){
        return function(dispatch,getState){
            let link = `${URL}/${uid}.json`,
                newObj = {name: newName, pw: NewPw},
                options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newObj)
                };

            return fetch(link, options)
                .then(()=>{
                    return dispatch({type:types.ADD_ITEM});
                })
                .catch((error)=>console.log(error));
        }

    },

    delItem: function(idItem, uid){
        return function(dispatch,getState){
            let link = `${URL}/${uid}/${idItem}.json`,
                options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

            return fetch(link, options)
                .then(()=>{
                    return dispatch({type:types.DEL_ITEM});
                })
                .catch((error)=>console.log(error));
        }

    },

    saveItem: function(idItem, name, password, uid){
        return function(dispatch,getState){
            let link = `${URL}/${uid}/${idItem}.json`,
                newObj = {name, pw: password},
                options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newObj)
                };

            return fetch(link, options)
                .then(()=>{
                    return dispatch({type:types.SAVE_ITEM});
                })
                .catch((error)=>console.log(error));
        }

    }

};