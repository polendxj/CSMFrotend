/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, NoData,ErrorModal} from '../components/Tool/Tool'
import BreadCrumbs from '../components/right/breadCrumbs'
import RegisterGroupComponent from '../components/right/groupManagement/RegisterGroupComponent'
import {saveGroup, getAreaApp, addAreaAppItem} from '../actions/SystemManagerGroupAction'

export default class GroupRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '系统管理', link: ''},
            {text: '服务', link: ''},
            {text: '区域管理', link: ''},
            {text: '注册分组', link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: "返回区域列表", action: "/SysManager/Service/Group"}
        ]
        this._save = this._save.bind(this)
        this._addAreaApp = this._addAreaApp.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(getAreaApp())
    }

    _save() {
        var postData = 'groupId=' + $("#group_id").val() + '&'
        $("#areaAppList select").each(function (idx) {
            if (idx % 2 == 0) {
                postData = postData + 'areaIds[]=' + $("#areaAppList select").eq(idx).val() + '&'
                console.log($("#areaAppList select").eq(idx).val())
            } else {
                postData = postData + 'appIds[]=' + $("#areaAppList select").eq(idx).val() + '&'
            }
        })
        postData = postData + 'description=' + $("#group_description").val() + '&'
        postData = postData + 'mode=new'
        if($("#group_id").val()){
            this.props.dispatch(saveGroup($("#group_id").val(),postData))
        }else{
            ErrorModal('警告!', '发生错误:' + '分组ID不能为空')
        }
    }

    _addAreaApp() {
        var itemsLen = $("#areaAppList").find('tr').length
        this.props.dispatch(addAreaAppItem(itemsLen + 1))
    }

    render() {
        const {data, form,items}=this.props
        console.log(items)
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
                                            <RegisterGroupComponent _save={this._save} data={data}
                                                                    _addAreaApp={this._addAreaApp} items={items}/>
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
    const {changeSearch1Type, form, groupSave}=state
    return {
        form: form,
        data: groupSave.data,
        items: groupSave.items
    }
}


export default connect(mapStateToProps)(GroupRegisterContainer)