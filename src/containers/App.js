import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'
import Header from '../components/header/header'
import {changeTopMenu, changeLeftMenu} from '../actions/MenuAction'
import {login} from '../actions/LoginAction'
import MainMenu from '../components/left/menu'
import Login from './Login'
import {EncodeBase64, ErrorModal} from '../components/Tool/Tool'


class App extends Component {
    constructor(props) {
        super(props)
        this._changeTopMenu = this._changeTopMenu.bind(this);
        this._checkAuth = this._checkAuth.bind(this)
        this._logOut = this._logOut.bind(this)
    }

    _changeTopMenu(menu) {
        this.props.dispatch(changeTopMenu(menu))
    }

    _checkAuth() {
        this.props.dispatch(login({adminId: $("#userName").val(), adminPwd: EncodeBase64($("#userPassword").val())}))

    }

    _logOut() {
        sessionStorage['auth'] = ""
        browserHistory.push('/login')
    }


    render() {
        // sessionStorage['auth']=""
        const {fetching}=this.props
        var auth = sessionStorage['auth']

        var result = ""
        if (auth) {
            result =
                <div>
                    <Header changeTopMenu={this._changeTopMenu} _logOut={this._logOut}/>
                    <ContentPanel selected={this.props.selected} dispatch={this.props.dispatch}
                                  breadCrumbs={this.props.breadCrumbs} children={this.props.children}/>
                </div>
        } else {
            result = <Login _checkAuth={this._checkAuth} fetching={fetching}/>
        }
        return (
            <div>
                {result}
            </div>
        )
    }
}

class ContentPanel extends Component {
    constructor(props) {
        super(props)
        this._changeLeftMenu = this._changeLeftMenu.bind(this);
    }

    _changeLeftMenu(menuArr) {
        this.props.dispatch(changeLeftMenu(menuArr))
    }

    render() {
        const {fetching, data}=this.props
        var auth = sessionStorage['auth']
        return (
            <div className="page-container" style={{minHeight: '800px'}}>
                <div className="page-content">
                    <div className="sidebar sidebar-main">
                        <MainMenu selected={this.props.selected} _changeLeftMenu={this._changeLeftMenu}/>
                    </div>
                    <div className="content-wrapper">
                        {this.props.children}
                    </div>

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const {changeTopMenu, changeLeftMenu, login}=state
    return {
        selected: changeTopMenu.topSelected,
        breadCrumbs: changeLeftMenu.breadCrumbs,
        login: login.fetching,
        data: login.data
    }
}

export default connect(mapStateToProps)(App)