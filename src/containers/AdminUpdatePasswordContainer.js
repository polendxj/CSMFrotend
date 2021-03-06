/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ErrorModal, EncodeBase64} from '../components/Tool/Tool'
import BreadCrumbs from '../components/right/breadCrumbs'
import UpdatePasswordComponent from '../components/right/adminManagement/UpdatePasswordComponent'
import {saveAdmin, detailAdmin} from '../actions/Admin'

export default class AdminUpdateContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '用户中心', link: ''},
            {text: '管理', link: ''},
            {text: '用户管理', link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: "返回用户列表", action: "/UserManager/Admin"}
        ]
        this._save = this._save.bind(this)
    }

    _save() {
        if (!this.props.form.UpdateAdminPasswordForm.values.adminPwd || (this.props.form.UpdateAdminPasswordForm.values.adminPwd2 != this.props.form.UpdateAdminPasswordForm.values.adminPwd )) {
            ErrorModal('警告!', '发生错误:' + '密码为空 或 两次密码输入不一致')
        }  else {
            var params = {
                adminId: this.props.form.UpdateAdminPasswordForm.values.adminId,
                adminName: this.props.form.UpdateAdminPasswordForm.values.adminName,
                adminPwd: EncodeBase64(this.props.form.UpdateAdminPasswordForm.values.adminPwd),
                adminPwd2: this.props.form.UpdateAdminPasswordForm.values.adminPwd2,
                phoneNumber: this.props.form.UpdateAdminPasswordForm.values.phoneNumber,
                useRadio: this.props.form.UpdateAdminPasswordForm.values.useYN,
                permissionId: this.props.form.UpdateAdminPasswordForm.values.permissionId,
                areaId: 20,
                mode:'modify'
            }
            this.props.dispatch(saveAdmin(params,'modify'))
        }

    }

    componentDidMount() {
        this.props.dispatch(detailAdmin(this.props.params.adminId.substring(1)))
    }

    render() {
        const {data, form}=this.props
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <div className="panel panel-flat">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="panel panel-flat">
                                        <div className="panel-body">
                                            <UpdatePasswordComponent _save={this._save} data={data}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {changeSearch1Type, form, adminDetail}=state
    return {
        form: form,
        data: adminDetail.data
    }
}

export default connect(mapStateToProps)(AdminUpdateContainer)