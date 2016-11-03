/**
 * Created by Administrator on 2016/10/11.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {browserHistory} from 'react-router'

export default class SessionAndUsersChartsComponent extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-7">
                    <div className="panel panel-flat">
                        <div className="panel-heading">
                            <h6 className="panel-title">当前活跃用户总趋势</h6>
                        </div>

                        <div className="container-fluid">
                            <div className="row text-center">
                                <div className="col-md-6">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin"><i className="icon-comment-discussion position-left text-slate"></i><span id="SessionAndUsersMaxUser">- -</span></h5>
                                        <span className="text-muted text-size-small">会话资源总数</span>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin"><i className="icon-users4 position-left text-slate"></i> <span id="SessionAndUsersActiveUser">- -</span></h5>
                                        <span className="text-muted text-size-small">活跃用户总数</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="position-relative" id="SessionAndUsersContainer"
                             style={{width: "95%", height: '200px'}}></div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="panel panel-flat">
                        <div className="panel-heading">
                            <h6 className="panel-title">告警信息</h6>
                        </div>

                        <div style={{width: '100%', height: '265px'}}>
                            <div className="table-responsive">
                                <table className="table text-nowrap">
                                    <tbody id="dashboardAlarm">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="panel panel-flat">
                        <div className="panel-heading">
                            <h6 className="panel-title">CSS 服务器使用情况</h6>
                        </div>

                        <div className="container-fluid">
                            <div className="row text-center">
                                <div className="col-md-3">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin"><i className="icon-database-menu position-left text-slate"></i> <span id="ServerUseStatusTotal">- -</span></h5>
                                        <span className="text-muted text-size-small">CSS总数</span>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin"><i className="icon-database-check position-left text-slate"></i> <span id="ServerUseStatusUsed">- -</span></h5>
                                        <span className="text-muted text-size-small">使用中</span>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin"><i className="icon-database-time2 position-left text-slate"></i> <span id="ServerUseStatusUnused">- -</span></h5>
                                        <span className="text-muted text-size-small">待使用</span>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin"><i className="icon-database-remove position-left text-slate"></i> <span id="ServerUseStatusStopped">- -</span></h5>
                                        <span className="text-muted text-size-small">已停止</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="ServerUseStatusContainer" style={{width: '98%', height: '200px'}}></div>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="panel panel-flat">
                        <div className="panel-heading">
                            <h6 className="panel-title">区域活跃用户分布</h6>
                        </div>

                        <div className="container-fluid">
                            <div className="row text-center">
                                <div className="col-md-12">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin"><i className="icon-users4 position-left text-slate"></i><span id="totalActiveUser">- -</span></h5>
                                        <span className="text-muted text-size-small">活跃用户总数</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="SoUserContainer" style={{width: '98%', height: '200px'}}></div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="panel panel-flat">
                        <div className="panel-heading">
                            <h6 className="panel-title">App服务器使用情况</h6>
                        </div>

                        <div id="AppUseServerContainer" style={{width: "95%",height:'200px'}}></div>
                    </div>
                </div>

            </div>
        )
    }
}