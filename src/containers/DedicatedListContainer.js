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
import DedicatedListComponent from '../components/right/dedicatedManagement/DedicatedListComponent'
import {getDedicatedList,deleteDedicated,detailDedicated} from '../actions/SystemManagerDedicatedAction'

export default class DedicatedListContainer extends Component {
    constructor(props) {
        super(props)
        this._delete=this._delete.bind(this)
        this._changePage = this._changePage.bind(this)
        this._prePage = this._prePage.bind(this)
        this._nextPage = this._nextPage.bind(this)
        this.page = 0
        this.breadCrumbs = [
            {text: '系统管理', link: ''},
            {text: '服务', link: ''},
            {text: '区域管理', link: ''}
        ]
        this.operation = [
            {icon: "icon-git-merge", text: "注册专用策略", action: "/SysManager/Service/Dedicated/Register"},
            {icon: "icon-spinner9", text: "刷新", action: ""}
        ]
        this._changeSearchType = this._changeSearchType.bind(this)
        this._search = this._search.bind(this)
        this.searchType = [
            {key: "AREA_NAME", value: "区域名称"},
            {key: "STB_ID", value: "机顶盒ID"},
            {key: "STB_IP", value: "机顶盒IP"},
            {key: "CSS_IP", value: "CSE服务器IP"}
        ]
    }

    componentDidMount() {
        this.props.dispatch(getDedicatedList(0, 'ALL', ''))
    }

    _changeSearchType(selected) {
        this.props.dispatch(changeSearch1Type(selected))
    }

    _delete(stbId) {
        var that = this
        ConfirmModal('警告!', '确认删除机顶盒ID为 ' + stbId + ' 的专用访问策略吗?', function () {
            that.props.dispatch(deleteDedicated(stbId, 0, that.props.selected.key, that.props.form.simple.values ? that.props.form.simple.values.searchText : ""))
        })

    }

    _search() {
        this.props.dispatch(getDedicatedList(0, this.props.selected.key, this.props.form.simple.values?this.props.form.simple.values.searchText:""))
    }
    _changePage(page) {
        this.page = page
        this.props.dispatch(getDedicatedList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _prePage(page) {
        this.page = this.page - 1
        this.props.dispatch(getDedicatedList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _nextPage(page) {
        this.page = this.page + 1
        this.props.dispatch(getDedicatedList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
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
                            <Search1 items={this.searchType} selected={selected} onChange={this._changeSearchType}
                                     _search={this._search}/>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="panel panel-flat">
                                        <div className="panel-body">
                                            <DedicatedListComponent data={data.dedicatedList} fetching={fetching} _delete={this._delete}/>
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
    const {changeSearch1Type, form, getSysManagerDedicatedList}=state
    return {
        selected: changeSearch1Type.selected,
        form: form,
        fetching: getSysManagerDedicatedList.fetching,
        data: getSysManagerDedicatedList.data
    }
}


export default connect(mapStateToProps)(DedicatedListContainer)