import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {actions as authActions} from '../../ducks/auth'

class App extends Component {
    constructor(props){
        super(props);

        this.props.checkLogin();
    }

    render(){
        return (
            <div className="main-wrap">

                <div className="header">
                    <h1 className="header-title">Password manager</h1>
                </div>

                {this.props.auth.status == "checking" ? "Проверка авторизации...." : this.props.children }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...authActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


