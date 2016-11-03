/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, NoData,ErrorModal} from '../components/Tool/Tool'
import BreadCrumbs from '../components/right/breadCrumbs'
import RegisterThresholdComponent from '../components/right/thresholdManagement/RegisterThresholdComponent'
import {saveThreshold} from '../actions/SystemManagerThresholdAction'

export default class CSERegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '性能监控', link: ''},
            {text: '告警', link: ''},
            {text: '阈值设置', link: ''},
            {text: '注册阈值', link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: "返回阈值列表", action: "/Monitor/Alarm/Threshold"}
        ]
        this._save = this._save.bind(this)
    }

    _save() {
        if(this.props.form.CreateThresholdForm.values.thresholdName){
            var params = {
                thresholdName:this.props.form.CreateThresholdForm.values.thresholdName,
                targetType:this.props.form.CreateThresholdForm.values.targetType,
                minor:this.props.form.CreateThresholdForm.values.minor,
                major:this.props.form.CreateThresholdForm.values.major,
                critical:this.props.form.CreateThresholdForm.values.critical,
                fatal:this.props.form.CreateThresholdForm.values.fatal,
                useYn:this.props.form.CreateThresholdForm.values.useYn,
                mode: 'new'
            }
            if(this.props.form.CreateThresholdForm.values.minorNotiYn){
                params['minorNotiYn']='on'
            }
            if(this.props.form.CreateThresholdForm.values.majorNotiYn){
                params['majorNotiYn']='on'
            }
            if(this.props.form.CreateThresholdForm.values.criticalNotiYn){
                params['criticalNotiYn']='on'
            }
            if(this.props.form.CreateThresholdForm.values.fatalNotiYn){
                params['fatalNotiYn']='on'
            }
            this.props.dispatch(saveThreshold(params))
        }else{
            ErrorModal('警告!', '发生错误:' + '阈值名称不能为空')
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
                                            <RegisterThresholdComponent _save={this._save} data={data}/>
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
    const {changeSearch1Type, form, thresholdSave}=state
    return {
        form: form
    }
}

export default connect(mapStateToProps)(CSERegisterContainer)