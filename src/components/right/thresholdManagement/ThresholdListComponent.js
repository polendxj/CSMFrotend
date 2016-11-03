/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData,alarmTargetTypeFilter} from '../../Tool/Tool'

export default class ThresholdListComponent extends Component {
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

    _start(id) {
        this.props._updateStatus(id, 'Y')
    }

    _stop(id) {
        this.props._updateStatus(id, 'N')
    }

    render() {
        const {data, fetching}=this.props
        let tb = []
        if (this.firstLoad) {
            this.firstLoad = false
            tb.push(<tr key={'loading'}>
                <td colSpan="7" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else if (data) {
            if (data.length == 0) {
                tb.push(<tr key={'noData'}>
                    <td colSpan="7" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            } else {
                data.forEach(function (val, key) {
                    tb.push(<tr key={key}>
                        <td>
                            <div className="media-left media-middle">
                                <i className="icon-spam position-left"
                                   style={{fontSize: "24px"}}></i>
                            </div>
                            <div className="media-left">
                                <div style={{fontSize: "16px"}}>
                                    <a href="#"
                                       className="text-default text-semibold">{val.thresholdName}</a>
                                </div>
                                <div className="text-muted text-size-small">
                                    {val.useYn == 'Y' ? <span className="label bg-success">使用中</span> :
                                        <span className="label bg-danger">已关闭</span>}
                                </div>
                            </div>
                        </td>
                        <td className="text-center">{alarmTargetTypeFilter(val.targetType)}</td>
                        <td className="text-center">{val.minor}%</td>
                        <td className="text-center">{val.major}%</td>
                        <td className="text-center">{val.critical}%</td>
                        <td className="text-center">{val.fatal}%</td>
                        <td className="text-center">{val.regDate}</td>
                        <td className="text-center">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li onClick={this._detail.bind(this, '/Monitor/Alarm/Threshold/Detail/:' + val.seq)}>
                                            <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                编辑阈值</a></li>
                                        <li onClick={this._delete.bind(this, val.seq)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            删除阈值</a></li>
                                        {val.useYn == 'Y' ?
                                            <li onClick={this._stop.bind(this, val)}><a
                                                href="javascript:void(0)"><i className="icon-stop"></i>关闭阈值</a></li> :
                                            <li onClick={this._start.bind(this, val)}><a
                                                href="javascript:void(0)"><i className="icon-play3"></i>开启阈值</a></li>}
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
                    <th className="col-md-2">告警阈值名称</th>
                    <th className="col-md-2 text-center">告警类型</th>
                    <th className="col-md-1 text-center">Minor 阈值</th>
                    <th className="col-md-1 text-center">Major 阈值</th>
                    <th className="col-md-1 text-center">Critical 阈值</th>
                    <th className="col-md-2 text-center">Fatal 阈值</th>
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