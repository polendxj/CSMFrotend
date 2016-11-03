/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from './breadCrumbs'
import {Loading, NoData} from '../Tool/Tool'

export default class JobHistoryListComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {data, fetching}=this.props
        let tb = []
        if (fetching) {
            tb.push(<tr key={'loading'}>
                <td colSpan="5" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else if (data) {
            if (data.length == 0) {
                tb.push(<tr key={'noData'}>
                    <td colSpan="5" style={{textAlign: 'center'}}>
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
                                    <a href="#" className="text-default text-semibold">{val.adminName}</a>
                                </div>
                                <div className="text-muted text-size-small">
                                    账号:{val.adminId}&nbsp;&nbsp;&nbsp;&nbsp;目标:{val.targetId}
                                </div>
                            </div>
                        </td>
                        <td className="text-center">{val.menuCategory}</td>
                        <td className="text-center">{val.jobCategory}</td>
                        <td className="text-center">{val.jobDetail}</td>
                        <td className="text-center">{val.jobDate}</td>
                    </tr>)
                }.bind(this))
            }
        }
        return (
            <table className="table text-nowrap">
                <thead>
                <tr style={{color: "#2196F3"}}>
                    <th className="col-md-2">操作员</th>
                    <th className="col-md-2 text-center">任务菜单</th>
                    <th className="col-md-2 text-center">操作类型</th>
                    <th className="col-md-4 text-center">详 情</th>
                    <th className="col-md-2 text-center">操作时间</th>
                </tr>
                </thead>
                <tbody>
                {tb}
                </tbody>
            </table>
        )
    }
}