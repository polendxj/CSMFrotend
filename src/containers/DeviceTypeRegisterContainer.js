/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ErrorModal,EncodeBase64} from '../components/Tool/Tool'
import BreadCrumbs from '../components/right/breadCrumbs'
import RegisterDeviceTypeComponent from '../components/right/deviceTypeManagement/RegisterDeviceTypeComponent'
import {saveAdmin} from '../actions/Admin'

export default class AdminRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '系统配置', link: ''},
            {text: '平台设置', link: ''},
            {text: '设备类型', link: ''},
            {text: '注册新设备', link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: "返回设备类型列表", action: "/SystemManager/Platform/DeviceType"}
        ]
        this._save = this._save.bind(this)
    }

    _save() {
        if (!this.props.form.CreateAdminForm.values.adminName) {
            ErrorModal('警告!', '发生错误:' + '管理员姓名不能为空')
        } else if (!this.props.form.CreateAdminForm.values.adminId) {
            ErrorModal('警告!', '发生错误:' + '管理员账号不能为空')
        } else if (!this.props.form.CreateAdminForm.values.adminPwd || (this.props.form.CreateAdminForm.values.adminPwd2 != this.props.form.CreateAdminForm.values.adminPwd )) {
            ErrorModal('警告!', '发生错误:' + '密码为空 或 两次密码输入不一致')
        } else {
            var params = {
                adminName: this.props.form.CreateAdminForm.values.adminName,
                adminId: this.props.form.CreateAdminForm.values.adminId,
                adminPwd: EncodeBase64(this.props.form.CreateAdminForm.values.adminPwd),
                adminPwd2: EncodeBase64(this.props.form.CreateAdminForm.values.adminPwd2),
                permissionId: this.props.form.CreateAdminForm.values.permissionId,
                useRadio: this.props.form.CreateAdminForm.values.useYN,
                phoneNumber: this.props.form.CreateAdminForm.values.phoneNumber,
                mode: 'new'
            }
            this.props.dispatch(saveAdmin(params))
        }

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
                                            <RegisterDeviceTypeComponent _save={this._save}/>
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
    const {changeSearch1Type, form, deviceTypeSave}=state
    return {
        form: form
    }
}

export default connect(mapStateToProps)(AdminRegisterContainer)