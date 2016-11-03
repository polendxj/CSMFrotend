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
import SEDListComponent from '../components/right/sedManagement/SEDListComponent'
import SEDStatusComponent from '../components/right/sedManagement/SEDStatusComponent'
import {saveSED, deleteSED, getSEDList} from '../actions/SystemManagerSEDAction'
import {commonRefresh} from '../actions/Common'

export default class SEDListContainer extends Component {
    constructor(props) {
        super(props)
        this._delete = this._delete.bind(this)
        this.tab=0
        this.cseTimer = ""
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
            {key: "AREA_NAME", value: "区域名称"},
            {key: "AGENT_IP", value: "Agent IP"},
            {key: "AGENT_PORT", value: "Agent Port"},
            {key: "AGENT_COMMENT", value: "Agent 描述"},
        ]
        this.searchType2 = [
            {key: "APP_ID", value: "应用ID"},
            {key: "APP_NAME", value: "应用名称"},
        ]

        this._changePage = this._changePage.bind(this)
        this._prePage = this._prePage.bind(this)
        this._nextPage = this._nextPage.bind(this)
        this.page = 0
    }

    componentDidMount() {
        var that=this
        this.props.dispatch(getSEDList(0, 'ALL', ''))
        this.cseTimer = setInterval(function () {
            this.props.dispatch(getSEDList(0, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
        }.bind(this), 5000)

        $("#sedLi").on('click', function () {
            that.tab=0
            that.props.dispatch(commonRefresh())
        })

        $("#statusLi").on('click', function () {
            that.tab=1
            that.props.dispatch(commonRefresh())
        })
    }

    componentWillUnmount() {
        clearInterval(this.cseTimer)
    }

    _changeSearchType(selected) {
        this.props.dispatch(changeSearch1Type(selected))
    }

    _delete(id) {
        var that = this
        ConfirmModal('警告!', '确认删除ID为 ' + id + ' 的SED吗?', function () {
            that.props.dispatch(deleteSED(id, 0, that.props.selected.key, that.props.form.simple.values ? that.props.form.simple.values.searchText : ""))
        })

    }

    _search() {
        this.props.dispatch(getSEDList(0, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _changePage(page) {
        this.page = page
        this.props.dispatch(getSEDList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _prePage(page) {
        this.page = this.page - 1
        this.props.dispatch(getSEDList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _nextPage(page) {
        this.page = this.page + 1
        this.props.dispatch(getSEDList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    render() {
        const {selected, form, fetching, data, refresh} =this.props
        console.log('-------')
        // console.log(this.props.data)
        var searchTab=""
        if(this.tab==0){
            searchTab= <Search1 items={this.searchType} selected={selected} onChange={this._changeSearchType}
                                _search={this._search}/>
        }else{
            searchTab= <Search1 items={this.searchType2} selected={selected} onChange={this._changeSearchType}
                                _search={this._search}/>
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
                            {searchTab}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="panel panel-flat">
                                        <div className="panel-body">
                                            <div className="tabbable">
                                                <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                                                    <li id="sedLi" className="active"><a
                                                        href="#justified-right-icon-tab1" data-toggle="tab"><i
                                                        className="icon-typewriter position-left"></i> SED 列表信息</a></li>
                                                    <li id="statusLi"><a href="#justified-right-icon-tab2"
                                                                         data-toggle="tab"><i
                                                        className="icon-file-eye2 position-left"></i>SED 状态汇报</a></li>
                                                </ul>

                                                <div className="tab-content">
                                                    <div className="tab-pane active" id="justified-right-icon-tab1">
                                                        <SEDListComponent data={data} fetching={fetching}
                                                                          _delete={this._delete}
                                                                          _updateStatus={this._updateStatus}/>

                                                        <Pagenation counts={data.sed ? (data.sed.nTotCnt ? data.sed.nTotCnt : 0) : 0} page={this.page}
                                                                    _changePage={this._changePage} _prePage={this._prePage}
                                                                    _nextPage={this._nextPage}/>
                                                    </div>

                                                    <div className="tab-pane" id="justified-right-icon-tab2">
                                                        <SEDStatusComponent data={data} fetching={fetching}
                                                                            _delete={this._delete}
                                                                            _updateStatus={this._updateStatus}/>

                                                        <Pagenation counts={data.detection ? (data.detection.nTotCnt ? data.detection.nTotCnt : 0) : 0} page={this.page}
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
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {changeSearch1Type, form, getSysManagerSEDList, commonReducer}=state
    return {
        selected: changeSearch1Type.selected,
        form: form,
        fetching: getSysManagerSEDList.fetching,
        data: getSysManagerSEDList.data,
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(SEDListContainer)