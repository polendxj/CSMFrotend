/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, NoData,ErrorModal} from '../components/Tool/Tool'
import BreadCrumbs from '../components/right/breadCrumbs'
import RegisterCSEComponent from '../components/right/cseManagement/RegisterCSEComponent'
import {saveCSE,getAreaList} from '../actions/SystemManagerCSEAction'

export default class CSERegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '系统管理', link: ''},
            {text: '服务', link: ''},
            {text: 'CSE引擎', link: ''},
            {text: '注册CSE', link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: "返回CSE列表", action: "/SysManager/Service/CSE"}
        ]
        this._save = this._save.bind(this)
    }

    _save() {
        if(this.props.form.CreateCSEForm.values.cse_ip && this.props.form.CreateCSEForm.values.cse_port){
            var params = {
                originServerIp:'',
                serverIp: this.props.form.CreateCSEForm.values.cse_ip,
                serverPort: this.props.form.CreateCSEForm.values.cse_port,
                location: this.props.form.CreateCSEForm.values.cse_location,
                areaId: this.props.form.CreateCSEForm.values.cse_area,
                useYN: this.props.form.CreateCSEForm.values.cse_status,
                mode: 'new'
            }
            this.props.dispatch(saveCSE(params))
        }else{
            ErrorModal('警告!', '发生错误:' + 'CSE IP 或者 Port 不能为空')
        }

    }

    componentDidMount(){
        this.props.dispatch(getAreaList())
    }

    render() {
        const {data, form}=this.props
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <div className="panel panel-flat">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="panel panel-flat">
                                        <div className="panel-body">
                                            <RegisterCSEComponent _save={this._save} data={data}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {changeSearch1Type, form, cseSave}=state
    return {
        form: form,
        data: cseSave.areaList
    }
}

export default connect(mapStateToProps)(CSERegisterContainer)