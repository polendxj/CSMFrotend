/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

export default class LoginContainer extends Component {
    _checkAuth(){
        this.props._checkAuth()
    }
    render() {
        return (
            <div className="page-container login-container" style={{minHeight:'533px'}}>

                <div className="page-content">

                    <div className="content-wrapper">

                        <div className="content">

                            <form action="index.html">
                                <div className="panel panel-body login-form">
                                    <div className="text-center">
                                        <div className="icon-object border-slate-300 text-slate-300"><i
                                            className="icon-reading"></i></div>
                                        <h5 className="content-group">Entrix 流化平台管理系统
                                            <small className="display-block">请输入登录信息</small>
                                        </h5>
                                    </div>

                                    <div className="form-group has-feedback has-feedback-left">
                                        <input id="userName" type="text" className="form-control" placeholder="Username"/>
                                        <div className="form-control-feedback">
                                            <i className="icon-user text-muted"></i>
                                        </div>
                                    </div>

                                    <div className="form-group has-feedback has-feedback-left">
                                        <input id="userPassword" type="password" className="form-control" placeholder="Password"/>
                                        <div className="form-control-feedback">
                                            <i className="icon-lock2 text-muted"></i>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button type="button" disabled={this.props.fetching} className="btn btn-primary btn-block" onClick={this._checkAuth.bind(this)}>登 录 <i
                                            className="icon-circle-right2 position-right"></i></button>
                                    </div>

                                    <div className="text-center">
                                        <a href="login_password_recover.html">忘记密码?</a>
                                    </div>
                                </div>
                            </form>


                            <div className="footer text-muted">
                                © 2015. <a href="#">CS Management</a> by <a
                                href="http://themeforest.net/user/Kopyov" target="_blank">Entrix</a>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    // const {changeSearch1Type, form, getSysManagerSOList}=state
    return {
        // selected: changeSearch1Type.selected,
        // form: form,
        // fetching: getSysManagerSOList.fetching,
        // data: getSysManagerSOList.data
    }
}


export default connect(mapStateToProps)(LoginContainer)