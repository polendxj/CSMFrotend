/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames'
import {Loading,audioCodes,videoCodes} from '../../Tool/Tool'

export default class UpdateCSEComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {fetching, data}=this.props
        const UpdateCSEFormForServer = require('../../ReduxForm/UpdateCSEFormForServer')
        const UpdateCSEFormForEngine = require('../../ReduxForm/UpdateCSEFormForEngine')
        const UpdateCSEFormForApplication = require('../../ReduxForm/UpdateCSEFormForApplication')
        const UpdateCSEFormForStatus = require('../../ReduxForm/UpdateCSEFormForStatus')
        let content = ""
        if (fetching) {
            content = <Loading />
        } else {
            if (data && data.cssVo) {
                content =
                    <div className="tabbable">
                        <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                            <li className="active"><a href="#justified-right-icon-tab0" data-toggle="tab"><i
                                className="icon-check position-left"></i> 全部信息</a></li>
                            <li ><a href="#justified-right-icon-tab1" data-toggle="tab"><i
                                className="icon-server position-left"></i> 服务器信息</a></li>
                            <li><a href="#justified-right-icon-tab2" data-toggle="tab"><i
                                className="icon-drive position-left"></i>引擎信息</a></li>
                            <li><a href="#justified-right-icon-tab3" data-toggle="tab"><i
                                className="icon-grid4 position-left"></i>应用信息</a></li>
                            <li><a href="#justified-right-icon-tab4" data-toggle="tab"><i
                                className="icon-shield-notice position-left"></i>状态信息</a></li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane active" id="justified-right-icon-tab0">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-responsive">
                                            <table className="table text-nowrap">
                                                <tbody>
                                                <tr>
                                                    <td style={{width: '10%'}}>
                                                        <div className="media-left media-middle">
                                                            <a href="#" className="btn btn-rounded btn-icon btn-xs">
                                                                <i className="icon-server"></i>
                                                            </a>
                                                        </div>

                                                        <div className="media-body">
                                                            <a href="#"
                                                               className="display-inline-block text-default text-semibold letter-icon-title">服务器信息</a>
                                                            <div className="text-muted text-size-small"><span
                                                                className="status-mark border-blue position-left"></span>
                                                                6项
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{width: '90%'}}>
                                                        <a href="#" className="text-default display-inline-block">
                                                            <code style={{marginRight:'2px'}}>主机名</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.hostName}</span>
                                                            <code style={{marginRight:'2px'}}>服务器IP</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>
                                                                <kbd>{data.cssVo.serverIp}</kbd>
                                                            </span>
                                                            <code style={{marginRight:'2px'}}>操作系统</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.osType}</span>
                                                            <code style={{marginRight:'2px'}}>CPU型号</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.cpuInfo}</span>
                                                            <code style={{marginRight:'2px'}}>GPU型号</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.gpuInfo}</span>
                                                            <code style={{marginRight:'2px'}}>内存大小</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.memory} M</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: '10%'}}>
                                                        <div className="media-left media-middle">
                                                            <a href="#" className="btn btn-rounded btn-icon btn-xs">
                                                                <i className="icon-drive"></i>
                                                            </a>
                                                        </div>

                                                        <div className="media-body">
                                                            <a href="#"
                                                               className="display-inline-block text-default text-semibold letter-icon-title">引擎信息</a>
                                                            <div className="text-muted text-size-small"><span
                                                                className="status-mark border-blue position-left"></span>
                                                                12项
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{width: '90%'}}>
                                                        <a href="#" className="text-default display-inline-block">
                                                                <code style={{marginRight:'2px'}}>引擎版本</code>
                                                                <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.cssVersion}</span>
                                                                <code style={{marginRight:'2px'}}>服务类型</code>
                                                                <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.serviceType}</span>
                                                                <code style={{marginRight:'2px'}}>端口号</code>
                                                                <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.serverPort}</span>
                                                                <code style={{marginRight:'2px'}}>最大访问者</code>
                                                                <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.maxConnect}个</span>
                                                                <code style={{marginRight:'2px'}}>当前访问者</code>
                                                                <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.currentConnect}个</span>
                                                                <code style={{marginRight:'2px'}}>目标码率</code>
                                                                <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.targetBitrate}</span>
                                                                <code style={{marginRight:'2px'}}>视频码率</code>
                                                                <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.videoBitrate}</span>
                                                                <code style={{marginRight:'2px'}}>帧率</code>
                                                                <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.frameRate}</span>
                                                                <code style={{marginRight:'2px'}}>音频编码</code>
                                                                <span className="text-semibold" style={{marginRight:'10px'}}>{audioCodes(data.cssVo.audioCodec)}</span>
                                                                <code style={{marginRight:'2px'}}>视频编码</code>
                                                                <span className="text-semibold" style={{marginRight:'10px'}}>{videoCodes(data.cssVo.videoCodec)}</span>
                                                                <code style={{marginRight:'2px'}}>Gop 大小</code>
                                                                <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.gopSize}</span>
                                                                <code style={{marginRight:'2px'}}>ERM IP:PORT</code>
                                                                <span className="text-semibold" style={{marginRight:'10px'}}>
                                                                    <kbd>{data.cssVo.ermIp + ':' + data.cssVo.ermPort}</kbd>
                                                                </span>

                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: '10%'}}>
                                                        <div className="media-left media-middle">
                                                            <a href="#" className="btn btn-rounded btn-icon btn-xs">
                                                                <i className="icon-shield-notice"></i>
                                                            </a>
                                                        </div>

                                                        <div className="media-body">
                                                            <a href="#"
                                                               className="display-inline-block text-default text-semibold letter-icon-title">状态信息</a>
                                                            <div className="text-muted text-size-small"><span
                                                                className="status-mark border-blue position-left"></span>
                                                                5项
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{width: '90%'}}>
                                                        <a href="#" className="text-default display-inline-block">
                                                            <code style={{marginRight:'2px'}}>区域名称</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.areaName}</span>
                                                            <code style={{marginRight:'2px'}}>位置</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.location}</span>
                                                            <code style={{marginRight:'2px'}}>分组ID</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.groupId}</span>
                                                            <code style={{marginRight:'2px'}}>设备状态</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>

                                                                <span className={classnames({'label':true, 'label-primary':data.cssVo.status.toLowerCase()=='active','label-danger':data.cssVo.status.toLowerCase()!='active'})}>{data.cssVo.status.toUpperCase()}</span>
                                                                </span>
                                                            <code style={{marginRight:'2px'}}>注册日期</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.regDate}</span>

                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: '10%'}}>
                                                        <div className="media-left media-middle">
                                                            <a href="#" className="btn btn-rounded btn-icon btn-xs">
                                                                <i className="icon-grid4"></i>
                                                            </a>
                                                        </div>

                                                        <div className="media-body">
                                                            <a href="#"
                                                               className="display-inline-block text-default text-semibold letter-icon-title">应用信息</a>
                                                            <div className="text-muted text-size-small"><span
                                                                className="status-mark border-blue position-left"></span>
                                                                6项
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{width: '90%'}}>
                                                        <a href="#" className="text-default display-inline-block">
                                                            <code style={{marginRight:'2px'}}>应用ID</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.appId}</span>
                                                            <code style={{marginRight:'2px'}}>应用名称</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.appName}</span>
                                                            <code style={{marginRight:'2px'}}>启动地址</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>
                                                                <kbd>{data.cssVo.webUrl}</kbd>
                                                            </span>
                                                            <code style={{marginRight:'2px'}}>视频（宽*高)</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.videoWidth + '*' + data.cssVo.videoHeight}</span>
                                                            <code style={{marginRight:'2px'}}>启用音频</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>

                                                                <span className={classnames({'label':true, 'label-success':data.cssVo.audio == 1,'label-default':data.cssVo.audio != 1})}>{data.cssVo.audio == 1 ? '启用' : '未启用'}</span>
                                                            </span>

                                                            <code style={{marginRight:'2px'}}>加载时间</code>
                                                            <span className="text-semibold" style={{marginRight:'10px'}}>{data.cssVo.loadTime}</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="tab-pane" id="justified-right-icon-tab1">
                                <UpdateCSEFormForServer />
                            </div>

                            <div className="tab-pane" id="justified-right-icon-tab2">
                                <UpdateCSEFormForEngine _save={this.props._save}/>
                            </div>

                            <div className="tab-pane" id="justified-right-icon-tab3">
                                <UpdateCSEFormForApplication _save={this.props._save}/>
                            </div>

                            <div className="tab-pane" id="justified-right-icon-tab4">
                                <UpdateCSEFormForStatus _save={this.props._save} areaList={this.props.areaList}/>
                            </div>
                        </div>
                    </div>
            } else {

            }
        }
        return (
            <div>
                {content}
            </div>
        )

    }
}