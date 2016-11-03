/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData,roleApplicationUse} from '../../Tool/Tool'

export default class CSEListComponent extends Component {
    constructor(props) {
        super(props)
        this.firstLoad = true
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id) {
        this.props._delete(id)
    }

    _startCSE(id) {
        this.props._updateStatus(id, 'Y')
    }

    _stopCSE(id) {
        this.props._updateStatus(id, 'N')
    }

    _restart(id) {

    }


    render() {
        const {data, fetching}=this.props
        let tb = []
        if (this.firstLoad) {
            this.firstLoad = false
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
                                <i className="icon-drive position-left"
                                   style={{fontSize: "24px"}}></i>
                            </div>
                            <div className="media-left">
                                <div style={{fontSize: "16px"}}>
                                    <a href="#"
                                       className="text-default text-semibold">{val.serverIp + ':' + val.serverPort}</a>
                                </div>
                                <div className="text-muted text-size-small">
                                    {val.useYN == 'Y' ? <span className="label bg-success">使用中</span> :
                                        <span className="label bg-danger">已关闭</span>}
                                </div>
                            </div>
                        </td>
                        <td className="text-center">{val.location}</td>
                        <td className="text-center">
                            {val.areaName}
                        </td>
                        <td className="text-center">{val.hostName}</td>
                        <td className="text-center">{val.serviceType}</td>
                        <td className="text-center">{val.appName}</td>
                        <td className="text-center">{val.groupId}</td>
                        <td className="text-center">
                            <div className="progress content-group-sm" style={{marginTop: '15px'}}>
                                <div className={classnames({
                                    'progress-bar': true,
                                    'progress-bar-striped': val.status.toLowerCase() == 'active',
                                    'active': true,
                                    'progress-bar-warning': val.status.toLowerCase() != 'active'
                                })} style={{
                                    width: '100%'
                                }}>
                                    {val.status}
                                </div>
                            </div>
                        </td>
                        <td className="text-center">
                            <div className="progress content-group-sm" style={{marginTop: '15px'}}>
                                <div className={classnames({
                                    'progress-bar': true,
                                    'progress-bar-striped': true,
                                    'active': true,
                                    'progress-bar-warning': (parseFloat(val.currentConnect) / parseFloat(val.maxConnect)).toFixed(2) > 0.7
                                })} style={{
                                    width: (parseFloat(val.currentConnect) / parseFloat(val.maxConnect)).toFixed(2) * 100 + '%'
                                }}>
                                    {(parseFloat(val.currentConnect) / parseFloat(val.maxConnect)).toFixed(2) * 100 + '%'}
                                </div>
                            </div>
                        </td>
                        <td className="text-center">{val.regDate}</td>
                        <td className="text-center">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li style={{display: roleApplicationUse('cssDetail') ? 'block' : 'none'}} onClick={this._detail.bind(this, '/SysManager/Service/CSE/Detail/:' + val.cssId)}>
                                            <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                CSE详情</a></li>
                                        <li style={{display: roleApplicationUse('cssWrite') ? 'block' : 'none'}} onClick={this._delete.bind(this, val.cssId)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            删除CSE</a></li>
                                        {val.useYN == 'Y' ?
                                            <li style={{display: roleApplicationUse('cssWrite') ? 'block' : 'none'}} onClick={this._stopCSE.bind(this, val.cssId, 'N', key)}><a
                                                href="javascript:void(0)"><i className="icon-stop"></i>停止CSE</a></li> :
                                            <li style={{display: roleApplicationUse('cssWrite') ? 'block' : 'none'}} onClick={this._startCSE.bind(this, val.cssId, 'Y', key)}><a
                                                href="javascript:void(0)"><i className="icon-play3"></i>开启CSE</a></li>}
                                        {val.useYN == 'Y' ? (<li style={{display: roleApplicationUse('cssWrite') ? 'block' : 'none'}} onClick={this._restart.bind(this, val.cssId)}><a
                                            href="javascript:void(0)"><i className="icon-spinner9"></i>
                                            重启CSE</a></li>) : ""}
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
                    <th className="col-md-1">IP:Port</th>
                    <th className="col-md-1 text-center">位置</th>
                    <th className="col-md-1 text-center">区域</th>
                    <th className="col-md-1 text-center">主机名</th>
                    <th className="col-md-1 text-center">服务类型</th>
                    <th className="col-md-2 text-center">App名称</th>
                    <th className="col-md-1 text-center">分组</th>
                    <th className="col-md-1 text-center">设备状态</th>
                    <th className="col-md-1 text-center">用户负载</th>
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