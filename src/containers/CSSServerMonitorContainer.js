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
import CSSServerMonitor from '../components/right/CSSServerMonitor'
import {getServerResourceList} from '../actions/SystemManagerServerResourceAction'

export default class CSSServerMonitorContainer extends Component {
    constructor(props) {
        super(props)
        this._changePage = this._changePage.bind(this)
        this._prePage = this._prePage.bind(this)
        this._nextPage = this._nextPage.bind(this)
        this.page = 0
        this.breadCrumbs = [
            {text: '性能监控', link: ''},
            {text: '监控', link: ''},
            {text: 'CSS监控', link: ''}
        ]
        this.operation = [
            {icon: "icon-spinner9", text: "刷新", action: ""}
        ]
        this._changeSearchType = this._changeSearchType.bind(this)
        this._search = this._search.bind(this)
        this.searchType = [
            {key: "HOST_NAME", value: "CSE 主机名"},
            {key: "SERVER_IP", value: "服务器IP"}
        ]
        this.cssserverMonitorTimer=""
    }

    componentDidMount() {
        this.props.dispatch(getServerResourceList(0, 'ALL', ''))
        this.cssserverMonitorTimer=setInterval(function () {
            this.props.dispatch(getServerResourceList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
        }.bind(this),5000)
    }

    componentWillUnmount(){
        clearInterval(this.cssserverMonitorTimer)
    }

    _changeSearchType(selected) {
        this.props.dispatch(changeSearch1Type(selected))
    }
    _search() {
        this.props.dispatch(getServerResourceList(0, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }
    _changePage(page) {
        this.page = page
        this.props.dispatch(getServerResourceList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _prePage(page) {
        this.page = this.page - 1
        this.props.dispatch(getServerResourceList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _nextPage(page) {
        this.page = this.page + 1
        this.props.dispatch(getServerResourceList(this.page, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }
    render() {
        const {selected ,fetching, data} =this.props
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
                                            <CSSServerMonitor data={data}/>
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
    const {changeSearch1Type, form, serverResourceList}=state
    return {
        selected: changeSearch1Type.selected,
        form: form,
        fetching: serverResourceList.fetching,
        data: serverResourceList.data
    }
}


export default connect(mapStateToProps)(CSSServerMonitorContainer)