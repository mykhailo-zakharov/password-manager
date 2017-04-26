import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Link } from 'react-router'

import {actions as authActions} from '../../ducks/auth'


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let {email, password} = this.state;

        this.props.createUserWithEmailAndPassword(email, password);
    }

    render() {

        return (
            <div >
                <Link to='/login'>Ввойти</Link>

                <h1>Регистрация</h1>

                <div className='authentication'>
                    <form className='authentication-form'
                          onSubmit={this.handleSubmit}
                    >
                        <input className='authentication-input'
                               type='text'
                               placeholder='email'
                               value={this.state.email}
                               onChange={(e)=>this.setState({email: e.target.value})}
                        />
                        <input className='authentication-input'
                               type='password'
                               placeholder='password'
                               value={this.state.password}
                               onChange={(e)=>this.setState({password: e.target.value})}
                        />
                        <button className='authentication-btn' type='submit'>Войти</button>
                    </form>
                </div>

            </div>
        )
    }
}
// const mapStateToProps = (state) => {
//     return {
// employee: state.employee
//     }
// };
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...authActions
    }, dispatch)
});
export default connect(null, mapDispatchToProps)(Register);
