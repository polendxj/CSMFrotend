/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ConfirmModal} from '../components/Tool/Tool'
import {changeSearch1Type} from '../actions/SearchAction'
import BreadCrumbs from '../components/right/breadCrumbs'
import UpdateCSEComponent from '../components/right/cseManagement/UpdateCSEComponent'
import {detailCSE, saveCSE, getAreaList} from '../actions/SystemManagerCSEAction'

export default class CSEUpdateContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '系统管理', link: ''},
            {text: '服务', link: ''},
            {text: 'CSE管理', link: ''},
            {text: 'CSE详情', link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: "返回CSE列表", action: "/SysManager/Service/CSE"}
        ]
        this._save = this._save.bind(this)
    }

    _save() {
        var params = {}
        this.props.dispatch(saveCSE(params, 'modify'))
    }

    componentDidMount() {
        this.props.dispatch(detailCSE(this.props.params.cssId.substring(1)))
        this.props.dispatch(getAreaList())
    }

    render() {
        const {form, fetching, data,areaList} =this.props
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
                            <UpdateCSEComponent fetching={fetching} data={data} _save={this._save} areaList={areaList}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {changeSearch1Type, form, cseDetail, cseSave}=state
    return {
        form: form,
        fetching: cseDetail.fetching,
        data: cseDetail.data,
        areaList: cseSave.areaList
    }
}


export default connect(mapStateToProps)(CSEUpdateContainer)