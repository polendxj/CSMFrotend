/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let CreateCSRForm  = (props) => {
    const {placeholder}=props
    return (
        <div className="row">
            <form className="form-horizontal" action="#">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>CSR 服务名</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="csr_name" component="input" type="text"
                                       placeholder={'服务名'} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>CSR IP</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="csr_ip" component="input" type="text"
                                       placeholder={'IP'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>CSR 端口</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="csr_port" component="input" type="text"
                                       placeholder={'Port'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>默认启用</label>
                            <div className="col-lg-9">
                                {/*<Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>
                                 <Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>*/}
                                <label className="radio-inline">
                                    <span><Field name="csr_status" component="input" type="radio" value="Y"  /></span>
                                    是
                                </label>

                                <label className="radio-inline">
                                    <span><Field  name="csr_status" component="input" type="radio" value="N" /></span>
                                    否
                                </label>
                            </div>
                        </div>

                        <div className="text-right">
                            <button type="button" className="btn btn-primary" onClick={props._saveCSR}>保 存</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

CreateCSRForm = reduxForm({
    form: 'CreateCSRForm'  // a unique identifier for this form
})(CreateCSRForm)

// You have to connect() to any reducers that you wish to connect to yourself
CreateCSRForm = connect(
    state => ({
        initialValues: {csr_status:'Y'} // pull initial values from account reducer
    })         // bind account loading action creator
)(CreateCSRForm)

export default CreateCSRForm
/*
 {
 /!*<div>
 /!*<!/

 </div>*!/
 }*/
