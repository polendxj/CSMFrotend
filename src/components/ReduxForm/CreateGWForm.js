/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let CreateGWForm  = (props) => {
    const {placeholder}=props
    return (
        <div className="row">
            <form className="form-horizontal" action="#">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>Gateway 服务器ID</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="gwId" component="input" type="text"
                                       placeholder={'ID'} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>服务器IP</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="serverIp" component="input" type="text"
                                       placeholder={'IP'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>服务器Port</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="serverPort" component="input" type="text"
                                       placeholder={'Port'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>配置信息</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="config" component="textarea" rows="10" />
                            </div>
                        </div>

                        <div className="text-right">
                            <button type="button" className="btn btn-primary" onClick={props._save}>保 存</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

CreateGWForm = reduxForm({
    form: 'CreateGWForm'  // a unique identifier for this form
})(CreateGWForm)

// You have to connect() to any reducers that you wish to connect to yourself


export default CreateGWForm
