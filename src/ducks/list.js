import { config } from '../api/db_setting'
const URL = config.databaseURL;


export const types = {
    GET_LIST: "GET_LIST",
    DEL_ITEM: "DEL_ITEM",
    EDIT_ITEM: "EDIT_ITEM",
    ADD_ITEM: "ADD_ITEM"
};

export const initialState = {
    list: null
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
            console.log(link);

            fetch(link, options)
                .then(function (response) {
                    return response.json();
                })
                .then((data)=>{
                    console.log(data);
                    dispatch({type:types.GET_LIST, data});
                })
                .catch((error)=>console.log(error));




            // fireRef
            //     .auth()
            //     .createUserWithEmailAndPassword(email, password)
            //     .then((data)=>{
            //         console.log("data sing", data);
            //         dispatch({
            //             type: types.REGISTER_USER,
            //             useremail: data.email,
            //             uid: data.uid
            //         });
            //         browserHistory.push(`/`);
            //     })
            //     .catch(function(error) {
            //         dispatch({type:types.ERROR_LOGIN});
            //         alert(error.message);
            //     });
        }
    }

};