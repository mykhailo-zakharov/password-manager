import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


import {actions as authActions} from '../../ducks/auth'
import {actions as listActions} from '../../ducks/list'


class Item extends Component {
    constructor(props){
        super(props);

        this.state = {
            isEdit: false,
            viewPw: false,
            name: this.props.item.name,
            password: this.props.item.pw
        };

        this.cansel = this.cansel.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    cansel(){
        this.setState({
            isEdit: false,
            name: this.props.item.name,
            password: this.props.item.pw
        });
    }

    deleteItem(){
        let uid = this.props.auth.uid,
            idItem = this.props.item.id;

        console.log(idItem, uid);
        this.props.delItem(idItem, uid)
            .then(()=>{
                this.props.getList(uid);
            })
            .catch((e)=>console.log(e));
    }

    render() {
        let {item, index} = this.props,
            password = this.state.viewPw ? item.pw : "********";

        if(!this.state.isEdit) {
            return (
                <tr className="table-row">
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{password}</td>
                    <td>
                        <button className="btn"
                                onClick={() => this.setState({viewPw: !this.state.viewPw})}
                        >
                            {this.state.viewPw ? "Скрыть" : "Посмотреть"}
                        </button>
                        <button className="btn"
                                onClick={() => this.setState({isEdit: !this.state.isEdit})}
                        >
                            Редактировать
                        </button>
                        <button className="btn"
                                onClick={this.deleteItem}
                        >
                            Удалить
                        </button>
                    </td>
                </tr>
            )
        } else {
            return(
                <tr className="table-row">
                    <td>{index + 1}</td>
                    <td>
                        <input type="text"
                               value={this.state.name}
                               onChange={(e)=>this.setState({name: e.target.value})}
                        />
                    </td>
                    <td>
                        <input type="text"
                               value={this.state.password}
                               onChange={(e)=>this.setState({password: e.target.value})}
                        />
                    </td>
                    <td>
                        <button className="btn"
                                onClick={this.cansel}
                        >Отменить</button>
                        <button className="btn">Сохранить</button>
                        <button className="btn"
                                onClick={this.deleteItem}
                        >
                            Удалить
                        </button>
                    </td>
                </tr>

            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
};
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...authActions,
        ...listActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);

