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

    this.state = {
        newName: null,
        password: null
    };

    this.addItem = this.addItem.bind(this);

  }

    componentWillMount() {
      let uid = this.props.auth.uid;
      this.props.getList(uid);
    }

    addItem(){
      let {password, newName} = this.state,
          uid = this.props.auth.uid;

      if(password == "" || newName == ""){
          alert("Заполните все поля!");
          return null;
      }

      this.props.addItem(newName, password, uid)
          .then(()=>{
                this.props.getList(uid);
          })
          .catch((e)=>console.log(e));

        this.setState({
            newName: "",
            password: ""
        });

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
          <button onClick={()=>this.props.logoutUser()}>Выйти</button>
        </div>

          <div>

              <input type="text"
                     value={this.state.newName}
                     onChange={(e)=>this.setState({newName: e.target.value})}
              />
              <input type="text"
                     value={this.state.password}
                     onChange={(e)=>this.setState({password: e.target.value})}
              />
              <button className="btn"
                      onClick={this.addItem}
              >
                  Добавить
              </button>

          </div>


          <table className="table">
              <tr className="table-row table-header">
                  <td>№</td>
                  <td style={{width: "250px"}}>Название</td>
                  <td style={{width: "250px"}}>Пароль</td>
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
