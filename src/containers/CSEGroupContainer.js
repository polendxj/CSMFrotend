/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Loading, NoData,ConfirmModal} from '../components/Tool/Tool'
import {changeSearch1Type} from '../actions/SearchAction'
import BreadCrumbs from '../components/right/breadCrumbs'
import Pagenation from '../components/right/Pagenation'
import Search1 from '../components/right/Search1'
import CseGroupListComponent from '../components/right/cseGroupManagement/CseGroupListComponent'
import {getGroupList,deleteGroup} from '../actions/SystemManagerGroupAction'

export default class CSEGroupContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '系统配置', link: ''},
            {text: '集群设置', link: ''},
            {text: 'CSE 引擎组', link: ''},
        ]
        this.operation = [
            {icon: "icon-git-merge", text: "注册新CSE引擎组", action: "/SysManager/ClusterSetting/CSEGroup/Register"},
            {icon: "icon-spinner9", text: "刷新", action: ""}
        ]
    }

    componentDidMount() {
        // this.props.dispatch(getGroupList(0, 'ALL', ''))
    }

    render() {
        const {selected, data, form, fetching}=this.props
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
                                            <CseGroupListComponent />

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
    const {}=state
    return {

    }
}


export default connect(mapStateToProps)(CSEGroupContainer)