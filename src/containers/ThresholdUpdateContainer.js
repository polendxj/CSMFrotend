/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ErrorModal} from '../components/Tool/Tool'
import BreadCrumbs from '../components/right/breadCrumbs'
import UpdateThresholdComponent from '../components/right/thresholdManagement/UpdateThresholdComponent'
import {saveThreshold,detailThreshold} from '../actions/SystemManagerThresholdAction'

export default class ThresholdUpdateContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '性能监控', link: ''},
            {text: '告警', link: ''},
            {text: '阈值设置', link: ''},
            {text: '更新阈值', link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: "返回阈值列表", action: "/Monitor/Alarm/Threshold"}
        ]
        this._save = this._save.bind(this)
    }

    _save() {
        if (this.props.form.UpdateThresholdForm.values.thresholdName) {
            var params = {
                seq: this.props.params.seq.substring(1),
                thresholdName: this.props.form.UpdateThresholdForm.values.thresholdName,
                targetType: this.props.form.UpdateThresholdForm.values.targetType,
                minor: this.props.form.UpdateThresholdForm.values.minor,
                major: this.props.form.UpdateThresholdForm.values.major,
                critical: this.props.form.UpdateThresholdForm.values.critical,
                fatal: this.props.form.UpdateThresholdForm.values.fatal,
                useYn: this.props.form.UpdateThresholdForm.values.useYn,
                mode: 'modify'
            }
            if (this.props.form.UpdateThresholdForm.values.minorNotiYn) {
                params['minorNotiYn'] = 'on'
            }
            if (this.props.form.UpdateThresholdForm.values.majorNotiYn) {
                params['majorNotiYn'] = 'on'
            }
            if (this.props.form.UpdateThresholdForm.values.criticalNotiYn) {
                params['criticalNotiYn'] = 'on'
            }
            if (this.props.form.UpdateThresholdForm.values.fatalNotiYn) {
                params['fatalNotiYn'] = 'on'
            }
            this.props.dispatch(saveThreshold(params,'modify'))
        } else {
            ErrorModal('警告!', '发生错误:' + '阈值名称不能为空')
        }

    }
    componentDidMount(){
        this.props.dispatch(detailThreshold(this.props.params.seq.substring(1)))
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
                                            <UpdateThresholdComponent _save={this._save} data={data}/>
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
    const {changeSearch1Type, form, thresholdDetail}=state
    return {
        form: form,
        data: thresholdDetail.data

    }
}

export default connect(mapStateToProps)(ThresholdUpdateContainer)