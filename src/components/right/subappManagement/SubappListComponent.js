/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData, audioCodes,roleApplicationUse} from '../../Tool/Tool'

export default class SubappListComponent extends Component {
    constructor(props) {
        super(props)
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id) {
        this.props._delete(id)
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
                                    <a href="#" className="text-default text-semibold">{val.subAppId}</a>
                                </div>
                                <div className="text-muted text-size-small">
                                    {val.appName}
                                </div>
                            </div>
                        </td>
                        <td className="text-center"><h6 className="text-semibold">{val.appId}</h6></td>
                        <td className="text-center">{val.videoWidth + '*' + val.videoHeight}</td>
                        <td className="text-center">
                            <span className="text-semibold" style={{marginRight: '10px'}}>
                                <span className={classnames({
                                    'label': true,
                                    'label-success': val.audio == 1,
                                    'label-default': val.audio != 1
                                })}>{val.audio == 1 ? '启用' : '未启用'}</span>
                            </span>
                        </td>
                        <td className="text-center">{val.webUrl}</td>
                        <td className="text-center">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li onClick={this._detail.bind(this, '/SysManager/Service/Subapp/Detail/:' + val.subAppId+'/:'+val.appId)}>
                                            <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                子级App详情</a></li>
                                        <li style={{display: roleApplicationUse('subAppWrite') ? 'block' : 'none'}} onClick={this._delete.bind(this, val.subAppId)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            删除子级App</a></li>
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
                    <th className="col-md-3">子级AppID&名称</th>
                    <th className="col-md-2 text-center">父级App ID</th>
                    <th className="col-md-2 text-center">视频（宽*高）</th>
                    <th className="col-md-2 text-center">音频启用</th>
                    <th className="col-md-2 text-center">启动地址</th>
                    <th className="text-center" style={{width: "20px"}}>
                        <i className="icon-arrow-down12"></i>
                    </th>
                </tr>
                </thead>
                <tbody>
                {tb}
                </tbody>
            </table>
        )
    }
}