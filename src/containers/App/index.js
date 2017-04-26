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
                    <h1 className="header-title">
                        <h1>Password manager</h1>
                    </h1>
                </div>


                {this.props.children}

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...authActions
    }, dispatch)
});

export default connect(null, mapDispatchToProps)(App);


