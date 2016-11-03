/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData} from '../../Tool/Tool'

export default class GWListComponent extends Component {
    constructor(props) {
        super(props)
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id) {
        this.props._delete(id)
    }

    _startGW(id){
        this.props._updateStatus(id,'Y')
    }
    _stopGW(id){
        this.props._updateStatus(id,'N')
    }

    render() {
        const {data, fetching}=this.props
        let tb = []
        if (fetching) {
            tb.push(<tr key={'loading'}>
                <td colSpan="10" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else if (data) {
            if (data.length == 0) {
                tb.push(<tr key={'noData'}>
                    <td colSpan="10" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            } else {
                data.forEach(function (val, key) {
                    tb.push(<tr key={key}>
                        <td>
                            <div className="media-left media-middle">
                                <i className="icon-git-merge position-left"
                                   style={{fontSize: "24px"}}></i>
                            </div>
                            <div className="media-left">
                                <div style={{fontSize: "16px"}}>
                                    <a href="#" className="text-default text-semibold">{val.gwId}</a>
                                </div>
                                <div className="text-muted text-size-small">
                                    {val.useYN == 'Y' ? <span className="label bg-success">使用中</span> :
                                        <span className="label bg-danger">已关闭</span>}
                                </div>
                            </div>
                        </td>
                        <td className="text-center"><h6 className="text-semibold">
                            {val.serverIp}:{val.serverPort}</h6></td>
                        <td className="text-center">{val.regDate}</td>
                        <td className="text-center">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li onClick={this._detail.bind(this,'/SysManager/Service/GW/Detail/:'+val.gwId)}><a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                            编辑Gateway</a></li>
                                        <li onClick={this._delete.bind(this, val.gwId)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            删除Gateway</a></li>
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
            <table className="table text-nowrap">
                <thead>
                <tr style={{color: "#2196F3"}}>
                    <th className="col-md-3">Gateway 服务器ID</th>
                    <th className="col-md-2 text-center">IP:PORT</th>
                    <th className="col-md-2 text-center">注册时间</th>
                    <th className="text-center" style={{width: "20px"}}><i
                        className="icon-arrow-down12"></i></th>
                </tr>
                </thead>
                <tbody>
                {tb}
                </tbody>
            </table>
        )
    }
}