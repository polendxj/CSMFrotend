/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import BreadCrumbs from '../components/right/breadCrumbs'
import Search1 from '../components/right/Search1'
import Pagenation from '../components/right/Pagenation'
import {changeSearch1Type} from '../actions/SearchAction'
import {getCSRList, updateCSR, deleteCSR,csrDetail} from '../actions/SystemManagerCSRAction'
import {Loading, NoData, ErrorModal, ConfirmModal,roleApplicationUse} from '../components/Tool/Tool'
import {bindActionCreators} from 'redux'

export default class SystemManagerCSR extends Component {
    constructor(props) {
        super(props)
        this._changeSearchType = this._changeSearchType.bind(this)
        this._search = this._search.bind(this)
        this.searchType = [{key: "RSS_ID", value: "CSR 服务器名"}, {key: "SERVER_IP", value: "CSR IP"}, {
            key: "SERVER_PORT",
            value: "CSR 端口"
        }]
        this._changePage = this._changePage.bind(this)
        this._prePage = this._prePage.bind(this)
        this._nextPage = this._nextPage.bind(this)
        this.page = 0
        this.breadCrumbs = [{text: '系统管理', link: ''}, {text: '服务', link: ''}, {text: 'CSR 路由', link: ''}]
        this.operation = [{icon: "icon-git-merge", text: "注册CSR服务", action: "/SysManager/Service/CSR/Create"}, {
            icon: "icon-spinner9",
            text: "刷新",
            action: ""
        }]
    }

    _changeSearchType(selected) {
        this.props.dispatch(changeSearch1Type(selected))
    }

    _startCSR(csrId, status, index) {
        this.props.dispatch(updateCSR(csrId, status, index))
    }

    _closeCSR(csrId, status, index) {
        this.props.dispatch(updateCSR(csrId, status, index))
    }

    _search() {
        this.props.dispatch(getCSRList(0, this.props.selected.key, this.props.form.simple.values?this.props.form.simple.values.searchText:""))
    }

    _changePage(page) {
        this.page = page
        this.props.dispatch(getCSRList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _prePage(page) {
        this.page = this.page - 1
        this.props.dispatch(getCSRList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _nextPage(page) {
        this.page = this.page + 1
        this.props.dispatch(getCSRList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _deleteCSR(rssId) {
        var that = this
        ConfirmModal('警告!', '确认删除名称为 ' + rssId + ' 的CSR吗?', function () {
            that.props.dispatch(deleteCSR(rssId, 0, that.props.selected.key, that.props.form.simple.values ? that.props.form.simple.values.searchText : ""))
        })

    }
    _detailCSR(path){
        browserHistory.push(path)
    }

    componentDidMount() {
        this.props.dispatch(getCSRList(0, 'ALL', ''))
    }

    render() {
        const {selected, form, fetching, data} =this.props
        // console.log('-------')
        // console.log(this.props.data)

        let tb = []
        if (fetching) {
            tb.push(<tr key={'loading'}>
                <td colSpan="5" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else if (data.csrList) {
            if (data.csrList.length == 0) {
                tb.push(<tr key={'noData'}>
                    <td colSpan="5" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            } else {
                data.csrList.forEach(function (val, key) {
                    tb.push(<tr key={key}>
                        <td>
                            <div className="media-left media-middle">
                                <i className="icon-git-merge position-left"
                                   style={{fontSize: "24px"}}></i>
                            </div>
                            <div className="media-left">
                                <div style={{fontSize: "16px"}}>
                                    <a href="#" className="text-default text-semibold">{val.rssId}</a>
                                </div>
                                <div className="text-muted text-size-small">
                                    {val.useYN == 'Y' ? <span className="label bg-success">使用中</span> :
                                        <span className="label bg-danger">已关闭</span>}
                                </div>
                            </div>
                        </td>
                        <td className="text-center"><h6 className="text-semibold">
                            {val.serverIp}:{val.serverPort}</h6></td>
                        <td className="text-center"><span className="text-muted">http://{val.serverIp}:{val.serverPort}/CSRS</span>
                        </td>
                        <td className="text-center">{val.regDate}</td>
                        <td className="text-center">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li onClick={this._detailCSR.bind(this,'/SysManager/Service/CSR/Detail/:'+val.rssId)}><a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                            CSR详情</a></li>
                                        <li style={{display: roleApplicationUse('csrWrite') ? 'block' : 'none'}} onClick={this._deleteCSR.bind(this, val.rssId)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            删除CSR</a></li>
                                        {val.useYN == 'Y' ?
                                            <li style={{display: roleApplicationUse('csrWrite') ? 'block' : 'none'}} onClick={this._closeCSR.bind(this, val.rssId, 'N', key)}><a
                                                href="javascript:void(0)"><i className="icon-stop"></i>停止CSR</a></li> :
                                            <li style={{display: roleApplicationUse('csrWrite') ? 'block' : 'none'}} onClick={this._startCSR.bind(this, val.rssId, 'Y', key)}><a
                                                href="javascript:void(0)"><i className="icon-play3"></i>开启CSR</a></li>}
                                        <li className="divider"></li>
                                        <li><a href="#"><i className="icon-stats-bars2"></i>
                                            监控信息</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </td>
                    </tr>)
                }.bind(this))

            }
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
                            <Search1 items={this.searchType} selected={selected} onChange={this._changeSearchType}
                                     _search={this._search}/>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="panel panel-flat">
                                        <div className="panel-body">
                                            <table className="table text-nowrap">
                                                <thead>
                                                <tr>
                                                    <th className="col-md-3">#</th>
                                                    <th className="col-md-2 text-center">CSR IP/PORT</th>
                                                    <th className="col-md-2 text-center">管理页URL</th>
                                                    <th className="col-md-2 text-center">注册时间</th>
                                                    <th className="text-center" style={{width: "20px"}}><i
                                                        className="icon-arrow-down12"></i></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {tb}
                                                </tbody>
                                            </table>
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
    const {changeSearch1Type, form, getSysManagerCSRList}=state
    return {
        selected: changeSearch1Type.selected,
        form: form,
        fetching: getSysManagerCSRList.fetching,
        data: getSysManagerCSRList.data
    }
}


export default connect(mapStateToProps)(SystemManagerCSR)