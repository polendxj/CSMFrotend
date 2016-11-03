/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ErrorModal} from '../components/Tool/Tool'
import BreadCrumbs from '../components/right/breadCrumbs'
import RegisterSubappComponent from '../components/right/subappManagement/RegisterSubappComponent'
import {saveSubapp, getAppList} from '../actions/SystemManagerSubAppAction'

export default class SubappRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '系统管理', link: ''},
            {text: '服务', link: ''},
            {text: '子级App', link: ''},
            {text: '注册子级App', link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: "返回子级App列表", action: "/SysManager/Service/Subapp"}
        ]
        this._save = this._save.bind(this)
    }

    _save() {
        if (this.props.form.CreateSubappForm.values.subapp_id && this.props.form.CreateSubappForm.values.subapp_name) {
            var params = {
                appId: this.props.form.CreateSubappForm.values.app_id,
                subAppId: this.props.form.CreateSubappForm.values.subapp_id,
                appName: this.props.form.CreateSubappForm.values.subapp_name,
                mode: 'new'
            }
            this.props.dispatch(saveSubapp(params))
        } else {
            ErrorModal('警告!', '发生错误:' + '子级App ID 或者 名称 不能为空')
        }

    }

    componentDidMount() {
        this.props.dispatch(getAppList())
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
                                            <RegisterSubappComponent _save={this._save} data={data}/>
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
    const {changeSearch1Type, form, subappSave}=state
    return {
        form: form,
        data: subappSave.appList
    }
}

export default connect(mapStateToProps)(SubappRegisterContainer)