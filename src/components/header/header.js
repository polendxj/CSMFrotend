/**
 * Created by Administrator on 2016/8/18.
 */
import React, {Component, PropTypes} from 'react';
import {roleApplicationUse} from '../../components/Tool/Tool'

export default class Header extends Component {
    render() {
        return (
            <div className="navbar navbar-inverse">
                <Logo />

                <div className="navbar-collapse collapse" id="navbar-mobile">
                    <div id="topMenuBottomLine"
                         style={{height: '2px', position: 'absolute', borderBottom: '3px solid #F5F5F5'}}></div>
                    <TopMenus changeTopMenu={this.props.changeTopMenu}/>
                    <RightPanel _logOut={this.props._logOut}/>
                </div>
            </div>
        )
    }
}

class Logo extends Component {
    constructor() {
        super();
        this.logo_style = {color: 'white', fontSize: '14px', position: 'relative', top: '9px'}
    }

    render() {
        return (
            <div className="navbar-header">
                <span id="logoText" style={this.logo_style}></span>
                <a className="navbar-brand" href="index.html"><img src="/assets/images/logo_light.png"
                                                                   style={{width: "90px", height: "29px",marginLeft:'28px',marginTop:'-5px'}} alt=""/>

                </a>
                <ul className="nav navbar-nav visible-xs-block">
                    <li><a data-toggle="collapse" data-target="#navbar-mobile"><i className="icon-tree5"></i></a>
                    </li>
                    <li><a className="sidebar-mobile-main-toggle"><i className="icon-paragraph-justify3"></i></a>
                    </li>
                </ul>
            </div>
        )
    }
}

class TopMenus extends Component {
    constructor() {
        super();
        this.span_style = {paddingLeft: 0};
        this.selected = 0;
    }

    _moveTopMenuBottomLine(idx, flag) {
        var width = $(".topmenu").eq(idx).width();
        var top = $(".topmenu").eq(idx).offset().top + 41;
        var left = $(".topmenu").eq(idx).offset().left;
        if (flag) {
            $("#topMenuBottomLine").css({width: width, top: top, left: left}, 500);
        } else {
            $("#topMenuBottomLine").animate({width: width, top: top, left: left}, 500);
        }
        this.selected = idx;
    }

    _menuChange(idx, flag) {
        this._moveTopMenuBottomLine(idx, flag);
        this.props.changeTopMenu(idx);
    }

    componentDidMount() {
        this._moveTopMenuBottomLine(0, true);
    }

    render() {
        return (
            <ul className="nav navbar-nav" style={{fontWeight: 'bold'}}>
                <li onClick={this._menuChange.bind(this, this.selected, true)}><a
                    className="sidebar-control sidebar-main-toggle hidden-xs"><i
                    className="icon-paragraph-justify3"></i></a></li>
                <li className="dropdown dropdown-user topmenu" onClick={this._menuChange.bind(this, 0, false)}>
                    <a className="dropdown-toggle" data-toggle="dropdown">
                        <span style={this.span_style}>实时监控</span>
                    </a>
                </li>
                <li className="dropdown dropdown-user topmenu" onClick={this._menuChange.bind(this, 1, false)}>
                    <a className="dropdown-toggle" data-toggle="dropdown">
                        <span style={this.span_style}>系统配置</span>
                    </a>
                </li>
                <li style={{display: roleApplicationUse('statistics') ? 'inline-block' : 'none'}}
                    className="dropdown dropdown-user topmenu" onClick={this._menuChange.bind(this, 2, false)}>
                    <a className="dropdown-toggle" data-toggle="dropdown">
                        <span style={this.span_style}>业务报表</span>
                    </a>
                </li>
                <li className="dropdown dropdown-user topmenu" onClick={this._menuChange.bind(this, 3, false)}>
                    <a className="dropdown-toggle" data-toggle="dropdown">
                        <span style={this.span_style}>用户中心</span>
                    </a>
                </li>
            </ul>
        )
    }
}

class RightPanel extends Component {
    render() {
        return (
            <ul className="nav navbar-nav navbar-right">
                <li className="dropdown language-switch">
                    <a className="dropdown-toggle" data-toggle="dropdown">
                        <img src="/assets/images/flags/cn.png" className="position-left" alt=""/>
                        中文
                        <span className="caret"></span>
                    </a>

                    <ul className="dropdown-menu">
                        <li><a className="deutsch"><img src="/assets/images/flags/gb.png" alt=""/> English</a>
                        </li>
                    </ul>
                </li>

                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <i className="icon-warning"></i>
                        <span className="visible-xs-inline-block position-right">告警</span>
                        <span className="badge bg-warning-400">2</span>
                    </a>

                    <div className="dropdown-menu dropdown-content width-350">
                        <div className="dropdown-content-heading">
                            告警
                        </div>

                        <ul className="media-list dropdown-content-body">
                            <li className="media">

                                <div className="media-body">
                                    <a href="#" className="media-heading">
                                        <span className="text-semibold">CDN-01 CPU</span>
                                        <span className="media-annotation pull-right">12:16</span>
                                    </a>

                                    <span
                                        className="text-muted">温度过高，请运维人员注意CPU散热，检查机房温度</span>
                                </div>
                            </li>
                            <li className="media">

                                <div className="media-body">
                                    <a href="#" className="media-heading">
                                        <span className="text-semibold">CDN-01 Disk</span>
                                        <span className="media-annotation pull-right">12:16</span>
                                    </a>

                                    <span
                                        className="text-muted">硬盘使用率已接近90%，请及时扩充硬盘，以免数据丢失。。。</span>
                                </div>
                            </li>


                        </ul>

                        <div className="dropdown-content-footer">
                            <a href="#" data-popup="tooltip" title="" data-original-title="All messages"><i
                                className="icon-menu display-block"></i></a>
                        </div>
                    </div>
                </li>

                <li className="dropdown dropdown-user">
                    <a className="dropdown-toggle" data-toggle="dropdown">
                        <img src="/assets/images/userimg.png" alt=""/>
                        <span>{sessionStorage['auth']}</span>
                        <i className="caret"></i>
                    </a>

                    <ul className="dropdown-menu dropdown-menu-right">
                        <li><a href="#"><i className="icon-user-plus"></i> 我的资料</a></li>
                        <li><a href="#"><span className="badge bg-teal-400 pull-right">58</span> <i
                            className="icon-comment-discussion"></i> 系统消息</a></li>
                        <li className="divider"></li>
                        <li><a href="#"><i className="icon-cog5"></i> 账号设置</a></li>
                        <li onClick={this.props._logOut}><a href="javascript:void(0)"><i className="icon-switch2"></i>
                            注销</a></li>
                    </ul>
                </li>
            </ul>
        )
    }
}



