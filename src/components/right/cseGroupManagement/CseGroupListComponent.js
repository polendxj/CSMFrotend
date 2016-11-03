/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData, roleApplicationUse} from '../../Tool/Tool'

export default class CseGroupListComponent extends Component {
    constructor(props) {
        super(props)
        this.firstLoad = true
    }

    componentDidMount() {

    }

    render() {
        const {data, fetching}=this.props
        return (
            <div>
                <fieldset className="content-group">
                    <legend className="text-bold">
                        CSE 引擎组搜索
                    </legend>
                    <div className="row search-option-buttons">
                        <div className="col-sm-10">
                            <div className="input-group bootstrap-touchspin"><span className="input-group-btn"><button
                                className="btn btn-default bootstrap-touchspin-down" type="button">CSE引擎组名称</button></span><span
                                className="input-group-addon bootstrap-touchspin-prefix"
                                style={{display: 'none'}}></span>
                                <input type="text" className="form-control"/>
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
                        CSE 引擎组列表
                    </legend>
                    <table className="table text-nowrap">
                        <thead>
                        <tr>
                            <th className="col-md-2"># <span style={{marginLeft: '37px'}}>CSE 引擎组名称</span></th>
                            <th className="col-md-2 text-center">CSE 服务器数</th>
                            <th className="col-md-2 text-center">SGID 数</th>
                            <th className="col-md-1 text-center">应用ID 数</th>
                            <th className="col-md-2 text-center">状 态</th>
                            <th className="col-md-2 text-center">注册时间</th>
                            <th className="text-center" style={{width: "20px"}}><i
                                className="icon-arrow-down12"></i></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <div className="media-left media-middle">
                                    <i className="icon-make-group position-left"
                                       style={{fontSize: "24px"}}></i>
                                </div>
                                <div className="media-left">
                                    <div style={{fontSize: "16px"}}>
                                        <a href="#" className="text-default text-semibold">{1213132123}</a>
                                    </div>
                                </div>
                            </td>
                            <td className="text-center">{5}</td>
                            <td className="text-center">{6}</td>
                            <td className="text-center">{2}</td>
                            <td className="text-center">{'time'}</td>
                            <td className="text-center">{'time'}</td>
                            <td className="text-center">
                                <ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li >
                                                <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                    分组详情</a></li>
                                            <li ><a
                                                href="javascript:void(0)"><i className="icon-trash"></i>
                                                删除分组</a></li>
                                            <li className="divider"></li>
                                            <li><a href="#"><i className="icon-stats-bars2"></i>
                                                监控信息</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        </tbody>
                    </table>



                </fieldset>
            </div>
        )
    }
}