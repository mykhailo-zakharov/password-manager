import React, {Component} from 'react'


class App extends Component {

    render() {
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

export default App;

