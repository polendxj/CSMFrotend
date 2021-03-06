/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ConfirmModal} from '../components/Tool/Tool'
import {changeSearch1Type} from '../actions/SearchAction'
import BreadCrumbs from '../components/right/breadCrumbs'
import Pagenation from '../components/right/Pagenation'
import Search1 from '../components/right/Search1'
import GWListComponent from '../components/right/gwManagement/GWListComponent'
import {getGWList,deleteGW,detailGW,updateGWStatus} from '../actions/SystemManagerGWAction'

export default class GWListContainer extends Component {
    constructor(props) {
        super(props)
        this._delete = this._delete.bind(this)
        this._updateStatus=this._updateStatus.bind(this)
        this._changePage = this._changePage.bind(this)
        this._prePage = this._prePage.bind(this)
        this._nextPage = this._nextPage.bind(this)
        this.page = 0
        this.breadCrumbs = [
            {text: '系统管理', link: ''},
            {text: '服务', link: ''},
            {text: 'Gateway管理', link: ''}
        ]
        this.operation = [
            {icon: "icon-git-merge", text: "注册新Gateway", action: "/SysManager/Service/GW/Register"},
            {icon: "icon-spinner9", text: "刷新", action: ""}
        ]
        this._changeSearchType = this._changeSearchType.bind(this)
        this._search = this._search.bind(this)
        this.searchType = [
            {key: "GW_ID", value: "Gateway 服务器ID"},
            {key: "SERVER_IP", value: "服务器IP"},
            {key: "SERVER_PORT", value: "端口"},
        ]
    }

    componentDidMount() {
        this.props.dispatch(getGWList(0, 'ALL', ''))
    }

    _changeSearchType(selected) {
        this.props.dispatch(changeSearch1Type(selected))
    }

    _delete(id) {
        var that = this
        ConfirmModal('警告!', '确认删除ID为 ' + id + ' 的Gateway吗?', function () {
            that.props.dispatch(deleteGW(id, 0, that.props.selected.key, that.props.form.simple.values ? that.props.form.simple.values.searchText : ""))
        })

    }
    _updateStatus(id,flag){
        this.props.dispatch(updateGWStatus(id,flag,0, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _search() {
        this.props.dispatch(getGWList(0, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _changePage(page) {
        this.page = page
        this.props.dispatch(getGWList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _prePage(page) {
        this.page = this.page - 1
        this.props.dispatch(getGWList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _nextPage(page) {
        this.page = this.page + 1
        this.props.dispatch(getGWList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    render() {
        const {selected, form, fetching, data} =this.props
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
                            <Search1 items={this.searchType} selected={selected} onChange={this._changeSearchType}
                                     _search={this._search}/>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="panel panel-flat">
                                        <div className="panel-body">
                                            <GWListComponent data={data.gatewayList} fetching={fetching} _delete={this._delete} _updateStatus={this._updateStatus} />
                                            <Pagenation counts={data.nTotCnt ? data.nTotCnt : 0} page={this.page}
                                                        _changePage={this._changePage} _prePage={this._prePage}
                                                        _nextPage={this._nextPage}/>
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
    const {changeSearch1Type, form, getSysManagerGWList}=state
    return {
        selected: changeSearch1Type.selected,
        form: form,
        fetching: getSysManagerGWList.fetching,
        data: getSysManagerGWList.data
    }
}

export default connect(mapStateToProps)(GWListContainer)