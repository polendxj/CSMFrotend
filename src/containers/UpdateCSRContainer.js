/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import UpdateCSRComponent from '../components/right/UpdateCSRComponent'
import {saveNewCSR,csrDetail} from '../actions/SystemManagerCSRAction'
import {ErrorModal,SuccessModal} from '../components/Tool/Tool'

export default class UpdateCSRContainer extends Component {
    constructor(props) {
        super(props)
        this._saveCSR = this._saveCSR.bind(this)
    }

    _saveCSR() {
        // console.log(this.props.form)
        // areaId=0&rssId=11111&serverIp=192.168.1.1&serverPort=80&useYN=N&mode=new
        var params = {
            areaId: 0,
            rssId: this.props.form.UpdateCSRForm.values.csr_name,
            serverIp: this.props.form.UpdateCSRForm.values.csr_ip,
            serverPort:this.props.form.UpdateCSRForm.values.csr_port,
            useYN:this.props.form.UpdateCSRForm.values.csr_status,
            mode:'modify'
        }
        this.props.dispatch(saveNewCSR(params,'update'))
    }

    componentDidMount(){
        this.props.dispatch(csrDetail(this.props.params.csrId.substring(1)))
    }

    render() {
        const {selected, form, fetching, data} =this.props

        return (
            <div>
                <UpdateCSRComponent _saveCSR={this._saveCSR} detail={data}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {form, detailSysManagerCSR}=state
    return {
        form: form,
        fetching: detailSysManagerCSR.fetching,
        data: detailSysManagerCSR.data
    }
}
export default connect(mapStateToProps)(UpdateCSRContainer)