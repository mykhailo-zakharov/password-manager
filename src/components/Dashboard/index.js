import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import Item from './Item'

import {actions as authActions} from '../../ducks/auth'
import {actions as listActions} from '../../ducks/list'


class Dashboard extends Component {
  constructor(props){
    super(props);

  }

componentWillMount() {
  let uid = this.props.auth.uid;
  this.props.getList(uid);
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
        </div>

          <table className="table">
              <tr className="table-row table-header">
                  <td>№</td>
                  <td>Название</td>
                  <td>Пароль</td>
                  <td>Управление</td>
              </tr>

              {this.props.list && this.props.list.map((item,index)=> <Item item={item} index={index} />)}

          </table>





      </div>
    )
  }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        list: state.list.list
    }
};
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...authActions,
        ...listActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
