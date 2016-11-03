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
import UpdateSoComponent from '../components/right/soManagement/UpdateSoComponent'
import {getSOList, saveSo, detailSo} from '../actions/SystemManagerSOAction'

export default class SoUpdateContainer extends Component {
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

    componentDidMount() {
        this.props.dispatch(detailSo(this.props.params.areaId.substring(1)))
    }

    _save() {
        var params = {
            areaId: this.props.form.UpdateSOForm.values.so_id,
            areaName: this.props.form.UpdateSOForm.values.so_name,
            soKeyword: this.props.form.UpdateSOForm.values.so_keyword,
            mode: 'modify'
        }
        this.props.dispatch(saveSo(params, 'modify'))
    }

    render() {
        const {data, form,fetching}=this.props
        var content=""
        if(fetching){
            content=<Loading/>
        }else{
            content=<UpdateSoComponent _save={this._save} detail={data}/>
        }
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
                                            {content}
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
    const {form, soDetail}=state
    return {
        form: form,
        data: soDetail.data,
        fetching: soDetail.fetching
    }
}


export default connect(mapStateToProps)(SoUpdateContainer)