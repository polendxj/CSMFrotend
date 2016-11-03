/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CreateCSRComponent from '../components/right/CreateCSRComponent'
import {saveNewCSR} from '../actions/SystemManagerCSRAction'
import {ErrorModal,SuccessModal} from '../components/Tool/Tool'

export default class CreateCSRContainer extends Component {
    constructor(props) {
        super(props)
        this._saveCSR = this._saveCSR.bind(this)
    }

    _saveCSR() {
        // console.log(this.props.form)
        // areaId=0&rssId=11111&serverIp=192.168.1.1&serverPort=80&useYN=N&mode=new
        var params = {
            areaId: 0,
            rssId: this.props.form.CreateCSRForm.values.csr_name,
            serverIp: this.props.form.CreateCSRForm.values.csr_ip,
            serverPort:this.props.form.CreateCSRForm.values.csr_port,
            useYN:this.props.form.CreateCSRForm.values.csr_status,
            mode:'new'
        }
        this.props.dispatch(saveNewCSR(params))
    }

    render() {
        const {selected, form, fetching, data} =this.props
        return (
            <div>
                <CreateCSRComponent _saveCSR={this._saveCSR}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {form, createSysManagerCSR}=state
    return {
        form: form,
        fetching: createSysManagerCSR.fetching,
        data: createSysManagerCSR.data
    }
}
export default connect(mapStateToProps)(CreateCSRContainer)