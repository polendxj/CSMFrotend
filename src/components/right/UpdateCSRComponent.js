/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';
import BreadCrumbs from './breadCrumbs'
import {Loading} from '../Tool/Tool'

export default class UpdateCSRComponent extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [{text: '系统管理', link: ''}, {text: '服务', link: ''}, {
            text: 'CSR 路由',
            link: ''
        }, {text: '编辑 CSR 路由', link: ''}]
    }

    render() {
        var content = ""
        console.log(this.props.detail.csr_name)
        if (this.props.detail.csr_name) {
            const UpdateCSRForm = require('../ReduxForm/UpdateCSRForm')
            content = <UpdateCSRForm _saveCSR={this.props._saveCSR} detail={this.props.detail}/>
        } else {
            content = <Loading />
        }
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={[{icon: "icon-git-merge", text: "返回CSR列表", action: "/SysManager/Service/CSR"}]}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <div className="panel panel-flat">
                        <div className="panel-heading">
                            <h5 className="panel-title">编辑CSR 路由</h5>
                        </div>
                        <div className="panel-body">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}