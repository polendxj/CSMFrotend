/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ConfirmModal} from '../components/Tool/Tool'
import {changeSearch1Type} from '../actions/SearchAction'
import BreadCrumbs from '../components/right/breadCrumbs'
import UpdateSubappComponent from '../components/right/subappManagement/UpdateSubappComponent'
import {detailSubapp} from '../actions/SystemManagerSubAppAction'

export default class SubappUpdateContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '系统管理', link: ''},
            {text: '服务', link: ''},
            {text: '子级App管理', link: ''},
            {text: '子级App详情', link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: "返回子级App列表", action: "/SysManager/Service/Subapp"}
        ]
    }

    componentDidMount() {
        this.props.dispatch(detailSubapp(this.props.params.subAppId.substring(1),this.props.params.appId.substring(1)))
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
                                            <UpdateSubappComponent data={data} fetching={fetching}/>
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
    const {changeSearch1Type, form, subappDetail}=state
    return {
        form: form,
        fetching: subappDetail.fetching,
        data: subappDetail.data
    }
}


export default connect(mapStateToProps)(SubappUpdateContainer)