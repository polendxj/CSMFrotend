/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, NoData} from '../components/Tool/Tool'
import {changeSearch1Type} from '../actions/SearchAction'
import BreadCrumbs from '../components/right/breadCrumbs'
import Pagenation from '../components/right/Pagenation'
import Search1 from '../components/right/Search1'
import RegisterSoComponent from '../components/right/soManagement/RegisterSoComponent'
import {getSOList,saveSo} from '../actions/SystemManagerSOAction'

export default class SoRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '系统管理', link: ''},
            {text: '服务', link: ''},
            {text: '区域管理', link: ''},
            {text: '注册新区域', link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: "返回区域列表", action: "/SysManager/Service/SO"}
        ]
        this._save = this._save.bind(this)
    }

    _save() {
        var params = {
            areaId: this.props.form.CreateSOForm.values.so_id,
            areaName: this.props.form.CreateSOForm.values.so_name,
            soKeyword: this.props.form.CreateSOForm.values.so_keyword,
            mode: 'new'
        }
        this.props.dispatch(saveSo(params))
    }

    render() {
        const {selected, data, form}=this.props
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
                                            <RegisterSoComponent _save={this._save}/>
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
    const {changeSearch1Type, form, soSave}=state
    return {
        form: form,
        data: soSave.data
    }
}


export default connect(mapStateToProps)(SoRegisterContainer)