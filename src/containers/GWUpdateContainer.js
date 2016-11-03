/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ConfirmModal} from '../components/Tool/Tool'
import {changeSearch1Type} from '../actions/SearchAction'
import BreadCrumbs from '../components/right/breadCrumbs'
import UpdateGWComponent from '../components/right/gwManagement/UpdateGWComponent'
import {detailGW, saveGW} from '../actions/SystemManagerGWAction'

export default class GWUpdateContainer extends Component {
    constructor(props) {
        super(props)
        this._save = this._save.bind(this)
        this.breadCrumbs = [
            {text: '系统管理', link: ''},
            {text: '服务', link: ''},
            {text: 'Gateway管理', link: ''},
            {text: 'Gateway详情', link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: "返回Gateway列表", action: "/SysManager/Service/GW"}
        ]
    }

    componentDidMount() {
        this.props.dispatch(detailGW(this.props.params.gwId.substring(1)))
    }

    _save() {
        if (this.props.form.UpdateGWForm.values.gwId && this.props.form.UpdateGWForm.values.serverIp && this.props.form.UpdateGWForm.values.serverPort) {
            var params = {
                areaId: 0,
                useYN: 'Y',
                gwId: this.props.form.UpdateGWForm.values.gwId,
                serverIp: this.props.form.UpdateGWForm.values.serverIp,
                serverPort: this.props.form.UpdateGWForm.values.serverPort,
                mode: 'modify'
            }
            this.props.dispatch(saveGW(params, 'modify'))
        } else if (this.props.form.CreateGWForm.values.gwId) {
            ErrorModal('警告!', '发生错误:' + 'GatewayID 不能为空')
        } else {
            ErrorModal('警告!', '发生错误:' + 'Gateway IP 或者 Port 不能为空')
        }

    }

    render() {
        const {form, fetching, data} =this.props
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
                                            <UpdateGWComponent _save={this._save} data={data} fetching={fetching}/>
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
    const {changeSearch1Type, form, gwDetail}=state
    return {
        form: form,
        fetching: gwDetail.fetching,
        data: gwDetail.data
    }
}


export default connect(mapStateToProps)(GWUpdateContainer)