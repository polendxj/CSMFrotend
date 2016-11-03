/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ErrorModal} from '../components/Tool/Tool'
import BreadCrumbs from '../components/right/breadCrumbs'
import RegisterGWComponent from '../components/right/gwManagement/RegisterGWComponent'
import {saveGW} from '../actions/SystemManagerGWAction'

export default class GWRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '系统管理', link: ''},
            {text: '服务', link: ''},
            {text: 'CSE引擎', link: ''},
            {text: '注册CSE', link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: "返回Gateway列表", action: "/SysManager/Service/GW"}
        ]
        this._save = this._save.bind(this)
    }

    _save() {
        if (this.props.form.CreateGWForm.values.gwId && this.props.form.CreateGWForm.values.serverIp && this.props.form.CreateGWForm.values.serverPort) {
            var params = {
                areaId: 0,
                gwId: this.props.form.CreateGWForm.values.gwId,
                serverIp: this.props.form.CreateGWForm.values.serverIp,
                serverPort: this.props.form.CreateGWForm.values.serverPort,
                useYN: 'Y',
                config:this.props.form.CreateGWForm.values.config,
                mode: 'new'
            }
            this.props.dispatch(saveGW(params))
        } else if (this.props.form.CreateGWForm.values.gwId) {
            ErrorModal('警告!', '发生错误:' + 'GatewayID 不能为空')
        } else {
            ErrorModal('警告!', '发生错误:' + 'Gateway IP 或者 Port 不能为空')
        }

    }

    componentDidMount() {

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
                                            <RegisterGWComponent _save={this._save} data={data} />
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
    const {changeSearch1Type, form}=state
    return {
        form: form
    }
}

export default connect(mapStateToProps)(GWRegisterContainer)