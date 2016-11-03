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
import CSEListComponent from '../components/right/cseManagement/CSEListComponent'
import {getCSEList, deleteCSE,updateCSEStatus} from '../actions/SystemManagerCSEAction'

export default class CSEListContainer extends Component {
    constructor(props) {
        super(props)
        this._delete = this._delete.bind(this)
        this._updateStatus=this._updateStatus.bind(this)
        this.cseTimer=""
        this._changePage = this._changePage.bind(this)
        this._prePage = this._prePage.bind(this)
        this._nextPage = this._nextPage.bind(this)
        this.page = 0
        this.breadCrumbs = [
            {text: '系统管理', link: ''},
            {text: '服务', link: ''},
            {text: 'CSE管理', link: ''}
        ]
        this.operation = [
            {icon: "icon-git-merge", text: "注册新CSE", action: "/SysManager/Service/CSE/Register"},
            {icon: "icon-spinner9", text: "刷新", action: ""}
        ]
        this._changeSearchType = this._changeSearchType.bind(this)
        this._search = this._search.bind(this)
        this.searchType = [
            {key: "HOST_NAME", value: "CSE 主机名"},
            {key: "SERVER_IP", value: "服务器IP"},
            {key: "SERVER_PORT", value: "端口"},
            {key: "LOCATION", value: "位置"},
            {key: "AREA_NAME", value: "区域"},
            {key: "APP_ID", value: "应用ID"},
            {key: "APP_NAME", value: "应用名"},
            {key: "CSS_VERSION", value: "引擎版本"},
            {key: "STATUS", value: "设备状态"},
        ]
    }

    componentDidMount() {
        this.props.dispatch(getCSEList(0, 'ALL', ''))
        this.cseTimer=setInterval(function () {
            this.props.dispatch(getCSEList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
        }.bind(this),5000)
    }
    componentWillUnmount(){
        clearInterval(this.cseTimer)
    }
    _changeSearchType(selected) {
        this.props.dispatch(changeSearch1Type(selected))
    }

    _delete(id) {
        var that = this
        ConfirmModal('警告!', '确认删除ID为 ' + id + ' 的CSE吗?', function () {
            that.props.dispatch(deleteCSE(id, 0, that.props.selected.key, that.props.form.simple.values ? that.props.form.simple.values.searchText : ""))
        })

    }
    _updateStatus(id,flag){
        this.props.dispatch(updateCSEStatus(id,flag,0, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _search() {
        this.props.dispatch(getCSEList(0, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _changePage(page) {
        this.page = page
        this.props.dispatch(getCSEList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _prePage(page) {
        this.page = this.page - 1
        this.props.dispatch(getCSEList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _nextPage(page) {
        this.page = this.page + 1
        this.props.dispatch(getCSEList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    render() {
        const {selected, form, fetching, data} =this.props
        // console.log('-------')
        // console.log(this.props.data)
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
                                            <CSEListComponent data={data.cssList} fetching={fetching}
                                                              _delete={this._delete} _updateStatus={this._updateStatus}/>
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
    const {changeSearch1Type, form, getSysManagerCSEList}=state
    return {
        selected: changeSearch1Type.selected,
        form: form,
        fetching: getSysManagerCSEList.fetching,
        data: getSysManagerCSEList.data
    }
}


export default connect(mapStateToProps)(CSEListContainer)