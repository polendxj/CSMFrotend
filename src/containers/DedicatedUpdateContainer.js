/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ErrorModal} from '../components/Tool/Tool'
import {changeSearch1Type} from '../actions/SearchAction'
import BreadCrumbs from '../components/right/breadCrumbs'
import Pagenation from '../components/right/Pagenation'
import Search1 from '../components/right/Search1'
import UpdateDedicatedComponent from '../components/right/dedicatedManagement/UpdateDedicatedComponent'
import {saveDedicated, areaSubInfoDedicated, detailDedicated} from '../actions/SystemManagerDedicatedAction'

export default class DedicatedUpdateContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '系统管理', link: ''},
            {text: '服务', link: ''},
            {text: '区域管理', link: ''},
            {text: '注册新区域', link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: "返回专访策略列表", action: "/SysManager/Service/Dedicated"}
        ]
        this._save = this._save.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(areaSubInfoDedicated())
        this.props.dispatch(detailDedicated(this.props.params.seq.substring(1)))
    }

    _save() {
        if (this.props.form.UpdateDedicatedForm.values.stbId) {
            var params = {
                seq:this.props.params.seq.substring(1),
                stbId: this.props.form.UpdateDedicatedForm.values.stbId,
                stbIp: this.props.form.UpdateDedicatedForm.values.stbIp,
                sourceAreaId: this.props.form.UpdateDedicatedForm.values.sourceAreaId,
                dedicatedType: this.props.form.UpdateDedicatedForm.values.dedicatedType,
                cssIp: this.props.form.UpdateDedicatedForm.values.cssIp,
                groupId: this.props.form.UpdateDedicatedForm.values.groupId,
                targetAreaId: this.props.form.UpdateDedicatedForm.values.targetAreaId,
                sourceType: this.props.form.UpdateDedicatedForm.values.sourceType,
                mode: 'modify'
            }
            this.props.dispatch(saveDedicated(params, 'modify'))
        } else {
            ErrorModal('警告!', '发生错误:' + '机顶盒ID 不能为空')
        }
    }

    render() {
        const {selected, data, form, areaSubInfo,detailDedicated}=this.props
        console.log(data)
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
                                            <UpdateDedicatedComponent _save={this._save} areaSubInfo={areaSubInfo} detailDedicated={detailDedicated}/>
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
    const {changeSearch1Type, form, dedicatedSave, dedicatedDetail}=state
    return {
        form: form,
        data: dedicatedSave.data,
        areaSubInfo: dedicatedSave.areaSubInfo,
        detailDedicated: dedicatedDetail.data
    }
}


export default connect(mapStateToProps)(DedicatedUpdateContainer)