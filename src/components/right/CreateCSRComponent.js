/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';
import BreadCrumbs from './breadCrumbs'

export default class CreateCSRComponent extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [{text: '系统管理', link: ''}, {text: '服务', link: ''}, {
            text: 'CSR 路由',
            link: ''
        }, {text: '创建 CSR 路由', link: ''}]
    }

    render() {
        const CreateCSRForm = require('../ReduxForm/CreateCSRForm')
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={[{icon: "icon-undo2", text: "返回CSR列表", action: "/SysManager/Service/CSR"}]}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <div className="panel panel-flat">
                        <div className="panel-heading">
                            <h5 className="panel-title">创建CSR 路由</h5>
                        </div>
                        <div className="panel-body">
                            <CreateCSRForm _saveCSR={this.props._saveCSR} />
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}