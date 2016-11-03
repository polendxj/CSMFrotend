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
import RegisterDedicatedComponent from '../components/right/dedicatedManagement/RegisterDedicatedComponent'
import {saveDedicated, areaSubInfoDedicated} from '../actions/SystemManagerDedicatedAction'

export default class DedicatedRegisterContainer extends Component {
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
    }

    _save() {
        if (this.props.form.CreateDedicatedForm.values.stbId) {
            var params = {
                stbId: this.props.form.CreateDedicatedForm.values.stbId,
                stbIp: this.props.form.CreateDedicatedForm.values.stbIp,
                sourceAreaId: this.props.form.CreateDedicatedForm.values.sourceAreaId,
                dedicatedType: this.props.form.CreateDedicatedForm.values.dedicatedType,
                cssIp: this.props.form.CreateDedicatedForm.values.cssIp,
                groupId: this.props.form.CreateDedicatedForm.values.groupId,
                targetAreaId: this.props.form.CreateDedicatedForm.values.targetAreaId,
                sourceType: this.props.form.CreateDedicatedForm.values.sourceType,
                mode: 'new'
            }
            this.props.dispatch(saveDedicated(params))
        } else {
            ErrorModal('警告!', '发生错误:' + '机顶盒ID 不能为空')
        }
    }

    render() {
        const {selected, data, form, areaSubInfo}=this.props
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
                                            <RegisterDedicatedComponent _save={this._save} areaSubInfo={areaSubInfo}/>
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
    const {changeSearch1Type, form, dedicatedSave}=state
    return {
        form: form,
        data: dedicatedSave.data,
        areaSubInfo: dedicatedSave.areaSubInfo
    }
}


export default connect(mapStateToProps)(DedicatedRegisterContainer)