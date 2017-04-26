import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import {actions as authActions} from '../../ducks/auth'


class Home extends Component {
  constructor(){
    super();

  }

  test() {
      let newData = {
          "testing": "23"
      };
      let options = {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
              //'Token': getToken() || ''
          },
          body: JSON.stringify(newData)
      };

    fetch("https://password-manager-70bf2.firebaseio.com/rest/listTest.json?print=pretty",options);
  }


  render() {
    if(!this.props.auth.useremail){
        browserHistory.push('/login');
      return null;
    }

    return (
      <div className='content'>
        <div className="content-menu">
          <h1>{this.props.auth.useremail}</h1>
          <a onClick={()=>this.props.logoutUser}>Выйти</a>
          <button onClick={::this.test}>55</button>
        </div>



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

export default connect(mapStateToProps, mapDispatchToProps)(Home);