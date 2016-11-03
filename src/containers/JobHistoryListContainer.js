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
import JobHistoryListComponent from '../components/right/JobHistoryListComponent'
import {getJobHistoryList} from '../actions/jobHistory'

export default class JobHistoryListContainer extends Component {
    constructor(props) {
        super(props)
        this._changePage = this._changePage.bind(this)
        this._prePage = this._prePage.bind(this)
        this._nextPage = this._nextPage.bind(this)
        this.page = 0
        this.breadCrumbs = [
            {text: '用户中心', link: ''},
            {text: '操作', link: ''},
            {text: '操作历史列表', link: ''}
        ]
        this.operation = [
            {icon: "icon-spinner9", text: "刷新", action: ""}
        ]
        this._changeSearchType = this._changeSearchType.bind(this)
        this._search = this._search.bind(this)
        this.searchType = [
            {key: "ADMIN_ID", value: "操作员账号"},
            {key: "ADMIN_NAME", value: "操作员姓名"},
            {key: "MENU_CATEGORY", value: "操作菜单"},
            {key: "JOB_CATEGORY", value: "操作种类"},
            {key: "TARGET_ID", value: "权限ID"},
            {key: "JOB_DETAIL", value: "任务详情"}
        ]
    }

    componentDidMount() {
        this.props.dispatch(getJobHistoryList(0, 'ALL', ''))
    }

    _changeSearchType(selected) {
        this.props.dispatch(changeSearch1Type(selected))
    }


    _search() {
        this.props.dispatch(getJobHistoryList(0, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _changePage(page) {
        this.page = page
        this.props.dispatch(getJobHistoryList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _prePage(page) {
        this.page = this.page - 1
        this.props.dispatch(getJobHistoryList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _nextPage(page) {
        this.page = this.page + 1
        this.props.dispatch(getJobHistoryList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
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
                                            <JobHistoryListComponent data={data.jobHistoryList} fetching={fetching}/>
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
    const {changeSearch1Type, form, getJobHistoryList}=state
    return {
        selected: changeSearch1Type.selected,
        form: form,
        fetching: getJobHistoryList.fetching,
        data: getJobHistoryList.data
    }
}


export default connect(mapStateToProps)(JobHistoryListContainer)