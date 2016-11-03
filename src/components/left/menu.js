/**
 * Created by Administrator on 2016/8/19.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import {roleApplicationUse} from '../../components/Tool/Tool'

class MainMenu extends Component {
    constructor() {
        super()
    }

    componentDidUpdate() {
        $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
            var count = 0;
            e.preventDefault();

            // Collapsible
            $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').show();


            // Accordion
            if ($('.navigation-main').hasClass('navigation-accordion')) {
                $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').hide();
            }
        });
    }

    render() {
        var mainMenu;
        switch (this.props.selected) {
            case 0:
                mainMenu = <PerformanceMonitoringMenu _changeLeftMenu={this.props._changeLeftMenu}/>
                break;
            case 1:
                mainMenu = <SystemConfiguration _changeLeftMenu={this.props._changeLeftMenu}/>
                break;
            case 2:
                mainMenu = <Elastic />
                break;
            case 3:
                mainMenu = <UserCenter />
                break;
            case 4:
                mainMenu = <AlarmManage />
                break
                break;
        }
        return (
            <div className="sidebar sidebar-main">
                <div className="sidebar-content">
                    <div className="sidebar-category sidebar-category-visible">
                        <div className="category-content no-padding">
                            {mainMenu}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class SystemConfiguration extends Component {
    _leftMenuClick(path) {
        browserHistory.push(path)
    }

    render() {
        return (
            <ul className="navigation navigation-main navigation-accordion">
                <li className="navigation-header"><span>系统配置</span> <i className="icon-menu" title=""
                                                                       data-original-title="系统配置"></i>
                </li>
                <li className="active">
                    <a href="javascript:void(0)" className="has-ul"><i className="icon-server"></i>
                        <span>服务器设置</span></a>
                    <ul className="hidden-ul" style={{display: 'block'}}>
                        <li  style={{display: roleApplicationUse('cssList') ? 'block' : 'none'}}
                             onClick={this._leftMenuClick.bind(this, '/SysManager/Service/CSE')}><a href="javascript:void(0)">CSE 引擎</a></li>
                        <li style={{display: roleApplicationUse('csrList') ? 'block' : 'none'}}
                            onClick={this._leftMenuClick.bind(this, '/SysManager/Service/CSR')}><a
                            href="javascript:void(0)">CSR 路由</a>
                        </li>
                        <li style={{display: roleApplicationUse('sedList') ? 'block' : 'none'}}
                            onClick={this._leftMenuClick.bind(this, '/SysManager/Service/SED')}><a
                            href="javascript:void(0)">SED 监控</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:void(0)" className="has-ul"><i className="icon-database-menu"></i>
                        <span>集群设置</span></a>
                    <ul className="hidden-ul" style={{display: 'none'}}>
                        <li onClick={this._leftMenuClick.bind(this, '/SystemManager/ClusterSetting/CSEGroupContainer')}><a
                            href="javascript:void(0)">CSE 引擎组</a></li>
                        <li><a href="javascript:void(0)">CSR 路由组</a></li>
                        <li><a href="javascript:void(0)">SED 监控组</a></li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:void(0)" className="has-ul"><i className="icon-dribbble3"></i>
                        <span>平台设置</span></a>
                    <ul className="hidden-ul" style={{display: 'none'}}>
                        <li
                            onClick={this._leftMenuClick.bind(this, '/SystemManager/Platform/DeviceType')}><a
                            href="javascript:void(0)">设备类型</a>
                        </li>
                        <li style={{display: roleApplicationUse('subAppList') ? 'block' : 'none'}}
                            onClick={this._leftMenuClick.bind(this, '/SysManager/Service/Subapp')}><a
                            href="javascript:void(0)">App 应用</a>
                        </li>
                        <li style={{display: roleApplicationUse('areaList') ? 'block' : 'none'}}
                            onClick={this._leftMenuClick.bind(this, '/SysManager/Service/SO')}><a
                            href="javascript:void(0)">区域设置</a>
                        </li>
                        <li onClick={this._leftMenuClick.bind(this, '/SysManager/Service/Dedicated')}><a
                            href="javascript:void(0)">路由策略</a>
                        </li>
                        <li><a
                            href="javascript:void(0)">版本控制</a>
                        </li>
                    </ul>
                </li>
                {/*<li onClick={this._leftMenuClick.bind(this, '/SysManager/Service/GW')}><a
                 href="javascript:void(0)"><i
                 className="icon-server"></i> <span>Gateway 网关</span></a></li>*/}

            </ul>
        )
    }
}

class PerformanceMonitoringMenu extends Component {
    _leftMenuClick(path) {
        browserHistory.push(path)
    }

    render() {
        return (
            <ul className="navigation navigation-main navigation-accordion">

                <li className="navigation-header"><span>实时监控</span> <i className="icon-menu" title=""
                                                                       data-original-title="实时监控"></i>
                </li>
                <li onClick={this._leftMenuClick.bind(this, 'dashboard')}><a
                    href="javascript:void(0)"><i
                    className="icon-home4"></i> <span>主面板</span></a></li>
                <li>
                    <a href="javascript:void(0)" className="has-ul"><i className="icon-feed"></i>
                        <span>服务监控</span></a>
                    <ul className="hidden-ul" style={{display: 'none'}}>
                        <li><a href="layout_navbar_fixed.html">App 应用</a></li>
                        <li onClick={this._leftMenuClick.bind(this, '/UserManager/CSSServerMonitor')}><a
                            href="javascript:void(0)">CSE 引擎</a></li>
                        <li><a href="layout_navbar_fixed.html">CSR 路由</a></li>
                        <li><a href="layout_navbar_fixed.html">SED 监控</a></li>
                    </ul>
                </li>
                <li>
                    <a onClick={this._leftMenuClick.bind(this, '/Monitor/RealTimeSessions')} href="javascript:void(0)">
                        <i className="icon-bubbles9"></i> <span>实时会话</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0)" className="has-ul"><i className="icon-warning"></i>
                        <span>告警管理</span></a>
                    <ul className="hidden-ul" style={{display: 'none'}}>
                        <li>
                            <a href="javascript:void(0)"><i className="icon-warning"></i> <span>活跃告警</span></a></li>
                        <li onClick={this._leftMenuClick.bind(this, '/systemConfig/originalSystem/dataCenterOfContentDistribute')}>
                            <a href="javascript:void(0)"><i className="icon-warning"></i> <span>告警历史</span></a></li>
                        <li onClick={this._leftMenuClick.bind(this, '/Monitor/Alarm/Threshold')}>
                            <a href="javascript:void(0)"><i className="icon-spam"></i> <span>阈值设置</span></a></li>
                    </ul>
                </li>
            </ul>

        )
    }
}

class Elastic extends Component {
    _leftMenuClick(path) {
        browserHistory.push(path)
    }

    render() {
        return (
            <ul className="navigation navigation-main navigation-accordion">

                <li className="navigation-header"><span>统计</span> <i className="icon-menu" title=""
                                                                     data-original-title="统计"></i>
                </li>
                <li onClick={this._leftMenuClick.bind(this, '/systemConfig/originalSystem/dataCenter')}><a
                    href="javascript:void(0)"><i
                    className="icon-air"></i> <span>简单统计</span></a></li>
                <li onClick={this._leftMenuClick.bind(this, '/systemConfig/originalSystem/dataCenter')}><a
                    href="javascript:void(0)"><i
                    className="icon-statistics"></i> <span>复合统计</span></a></li>


            </ul>
        )
    }
}

class UserCenter extends Component {
    _leftMenuClick(path) {
        browserHistory.push(path)
    }

    render() {
        return (
            <ul className="navigation navigation-main navigation-accordion">

                <li className="navigation-header"><span>管理</span> <i className="icon-menu" title=""
                                                                     data-original-title="管理"></i>
                </li>
                <li style={{display: roleApplicationUse('adminList') ? 'block' : 'none'}}
                    onClick={this._leftMenuClick.bind(this, '/UserManager/Admin')}><a
                    href="javascript:void(0)"><i
                    className="icon-user"></i> <span>用户管理</span></a></li>
                <li style={{display: roleApplicationUse('permissionConfig') ? 'block' : 'none'}}
                    onClick={this._leftMenuClick.bind(this, '/UserManager/Permission')}><a
                    href="javascript:void(0)"><i
                    className="icon-vcard"></i> <span>权限管理</span></a></li>
                <li className="navigation-header"><span>操作</span> <i className="icon-menu" title=""
                                                                     data-original-title="操作"></i>
                </li>
                <li style={{display: roleApplicationUse('jobHistoryList') ? 'block' : 'none'}}
                    onClick={this._leftMenuClick.bind(this, '/UserManager/Operation/JobHistoryList')}><a
                    href="javascript:void(0)"><i
                    className="icon-history"></i> <span>操作历史</span></a></li>


            </ul>
        )
    }
}

class AlarmManage extends Component {
    _leftMenuClick(path) {
        browserHistory.push(path)
    }

    render() {
        return (
            <ul className="navigation navigation-main navigation-accordion">

                <li className="navigation-header"><span>告警管理</span> <i className="icon-menu" title=""
                                                                       data-original-title="告警"></i>
                </li>
                <li>
                    <a href="javascript:void(0)"><i className="icon-warning"></i> <span>活跃告警</span></a></li>
                <li onClick={this._leftMenuClick.bind(this, '/systemConfig/originalSystem/dataCenterOfContentDistribute')}>
                    <a href="javascript:void(0)"><i className="icon-warning"></i> <span>告警历史</span></a></li>
                <li onClick={this._leftMenuClick.bind(this, '/Monitor/Alarm/Threshold')}>
                    <a href="javascript:void(0)"><i className="icon-spam"></i> <span>阈值设置</span></a></li>

            </ul>
        )
    }
}

export default MainMenu