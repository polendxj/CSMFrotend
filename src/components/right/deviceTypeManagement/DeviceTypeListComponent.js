/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData, roleApplicationUse} from '../../Tool/Tool'

export default class DeviceTypeListComponent extends Component {
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

    componentDidMount(){
        $('.select-search').select2();
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
                        <td className="text-center">{val.browser}</td>
                        <td className="text-center">{val.chipset}</td>
                        <td className="text-center">{val.revision}</td>
                        <td className="text-center">{val.useYN}</td>
                        <td className="text-center">{val.regDate}</td>
                        <td className="text-center">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}}
                                            onClick={this._delete.bind(this, val.seq)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            删除设备</a></li>
                                        {val.useYN == 'Y' ?
                                            <li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}}
                                                onClick={this._stopCSE.bind(this, val.cssId, 'N', key)}><a
                                                href="javascript:void(0)"><i className="icon-stop"></i>禁用账户</a></li> :
                                            <li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}}
                                                onClick={this._startCSE.bind(this, val.cssId, 'Y', key)}><a
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
            <div>
                <fieldset className="content-group">
                    <legend className="text-bold">
                        设备类型搜索
                    </legend>

                    <div className="row search-option-buttons">
                        <div className="col-sm-3">
                            <div className="input-group bootstrap-touchspin"><span className="input-group-btn"><button
                                className="btn btn-default bootstrap-touchspin-down" type="button">浏览器</button></span><span
                                className="input-group-addon bootstrap-touchspin-prefix"
                                style={{display: 'none'}}></span>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="input-group bootstrap-touchspin"><span className="input-group-btn"><button
                                className="btn btn-default bootstrap-touchspin-down" type="button">芯片类型</button></span><span
                                className="input-group-addon bootstrap-touchspin-prefix"
                                style={{display: 'none'}}></span>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="input-group bootstrap-touchspin"><span className="input-group-btn"><button
                                className="btn btn-default bootstrap-touchspin-down" type="button">小版本</button></span><span
                                className="input-group-addon bootstrap-touchspin-prefix"
                                style={{display: 'none'}}></span>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="input-group bootstrap-touchspin"><span className="input-group-btn"><button
                                className="btn btn-default bootstrap-touchspin-down"
                                type="button">当前状态</button></span><span
                                className="input-group-addon bootstrap-touchspin-prefix"
                                style={{display: 'none'}}></span>
                                <select className="select-search">
                                    <option value="AZ">启用</option>
                                    <option value="CO">禁用</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-primary btn-sm"><i
                                className="icon-search4 position-left"></i> 搜 索
                            </button>
                        </div>

                    </div>

                </fieldset>
                <fieldset className="content-group">
                    <legend className="text-bold">
                        设备类型列表
                    </legend>
                    <table className="table text-nowrap">
                        <thead>
                        <tr style={{color: "#2196F3"}}>
                            <th className="col-md-2">浏览器版本</th>
                            <th className="col-md-2 text-center">芯片版本</th>
                            <th className="col-md-2 text-center">小版本号</th>
                            <th className="col-md-2 text-center">注册时间</th>
                            <th className="col-md-2 text-center">注册时间</th>
                            <th className="text-center" style={{width: "20px"}}><i
                                className="icon-arrow-down12"></i></th>
                        </tr>
                        </thead>
                        <tbody>
                        {tb}
                        </tbody>
                    </table>

                </fieldset>
            </div>

        )
    }
}