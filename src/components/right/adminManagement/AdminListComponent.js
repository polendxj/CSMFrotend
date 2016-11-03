/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData,roleApplicationUse} from '../../Tool/Tool'

export default class AdminListComponent extends Component {
    constructor(props) {
        super(props)
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
                    <td colSpan="6" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            } else {
                data.forEach(function (val, key) {

                    var accountStatusIcon = classnames({
                        'icon-user-check': val.useYN == 'Y',
                        'icon-user-block': val.useYN != 'Y',
                        'position-left': true
                    })
                    tb.push(<tr key={key}>
                        <td>
                            <div className="media-left media-middle">
                                <i className={accountStatusIcon}
                                   style={{fontSize: "24px"}}></i>
                            </div>
                            <div className="media-left">
                                <div style={{fontSize: "16px"}}>
                                    <a href="#"
                                       className="text-default text-semibold">{val.adminName}</a>
                                </div>
                                <div className="text-muted text-size-small">
                                    {val.useYN == 'Y' ? <span className="label bg-success">使用中</span> :
                                        <span className="label bg-danger">已关闭</span>}
                                </div>
                            </div>
                        </td>
                        <td className="text-center">{val.adminId}</td>
                        <td className="text-center">{val.permissionId}</td>
                        <td className="text-center">{val.phoneNumber}</td>
                        <td className="text-center">{val.regDate}</td>
                        <td className="text-center">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}}  onClick={this._detail.bind(this, '/UserManager/Admin/Detail/:' + val.adminId)}>
                                            <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                账户详情</a></li>
                                        <li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}} onClick={this._delete.bind(this, val.adminId)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            删除账户</a></li>
                                        <li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}} onClick={this._detail.bind(this, '/UserManager/Admin/ModifyPassword/:' + val.adminId)}>
                                            <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                修改密码</a></li>
                                        {val.useYN == 'Y' ?
                                            <li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}} onClick={this._stopCSE.bind(this, val.cssId, 'N', key)}><a
                                                href="javascript:void(0)"><i className="icon-stop"></i>禁用账户</a></li> :
                                            <li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}} onClick={this._startCSE.bind(this, val.cssId, 'Y', key)}><a
                                                href="javascript:void(0)"><i className="icon-play3"></i>启用账户</a></li>}
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
                    <th className="col-md-2">管理员名称</th>
                    <th className="col-md-2 text-center">账号</th>
                    <th className="col-md-2 text-center">权限</th>
                    <th className="col-md-2 text-center">联系方式</th>
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