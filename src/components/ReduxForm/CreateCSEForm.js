/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let CreateCSEForm  = (props) => {
    const {placeholder}=props
    var options=[]
    props.data.areaList.forEach(function (area,key) {
        options.push(<option key={key} value={area.areaId}>{area.areaName}</option>)
    })
    return (
        <div className="row">
            <form className="form-horizontal" action="#">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>CSE服务器IP</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="cse_ip" component="input" type="text"
                                       placeholder={'IP'} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>端口号</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="cse_port" component="input" type="text"
                                       placeholder={'Port'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>位置</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="cse_location" component="input" type="text"
                                       placeholder={'位置'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>区域</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="cse_area" component="select">
                                    {options}
                                </Field>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>默认启用</label>
                            <div className="col-lg-9">
                                {/*<Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>
                                 <Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>*/}
                                <label className="radio-inline">
                                    <span><Field name="cse_status" component="input" type="radio" value="Y"  /></span>
                                    是
                                </label>

                                <label className="radio-inline">
                                    <span><Field  name="cse_status" component="input" type="radio" value="N" /></span>
                                    否
                                </label>
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

CreateCSEForm = reduxForm({
    form: 'CreateCSEForm'  // a unique identifier for this form
})(CreateCSEForm)

// You have to connect() to any reducers that you wish to connect to yourself
CreateCSEForm = connect(
    state => ({
        initialValues: {cse_status:'Y'} // pull initial values from account reducer
    })         // bind account loading action creator
)(CreateCSEForm)

export default CreateCSEForm
/*
 {
 /!*<div>
 /!*<!/

 </div>*!/
 }*/
