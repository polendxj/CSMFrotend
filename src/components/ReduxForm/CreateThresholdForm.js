/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let CreateThresholdForm  = (props) => {
    const {placeholder}=props
    var options=[]
    for(var i=0;i<=99;i++){
        options.push(<option key={i} value={i}>{i+'%'}</option>)
    }
    return (
        <div className="row">
            <form className="form-horizontal" action="#">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>阈值名称</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="thresholdName" component="input" type="text"
                                       placeholder={'名称'} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>阈值类型</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="targetType" component="select">
                                    <option value={1}>CPU</option>
                                    <option value={2}>Memory</option>
                                    <option value={3}>Network</option>
                                    <option value={4}>Disk</option>
                                </Field>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>Minor</label>
                            <div className="col-lg-5">
                                <Field className="form-control" name="minor" component="select">
                                    {options}
                                </Field>
                            </div>
                            <div className="col-lg-4">
                                <label className="checkbox-inline">
                                    <Field name="minorNotiYn" component="input"
                                           type="checkbox"/>主动通知
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>Major</label>
                            <div className="col-lg-5">
                                <Field className="form-control" name="major" component="select">
                                    {options}
                                </Field>
                            </div>
                            <div className="col-lg-4">
                                <label className="checkbox-inline">
                                    <Field name="majorNotiYn" component="input"
                                           type="checkbox"/>主动通知
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>Critical</label>
                            <div className="col-lg-5">
                                <Field className="form-control" name="critical" component="select">
                                    {options}
                                </Field>
                            </div>
                            <div className="col-lg-4">
                                <label className="checkbox-inline">
                                    <Field name="criticalNotiYn" component="input"
                                           type="checkbox"/>主动通知
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>Fatal</label>
                            <div className="col-lg-5">
                                <Field className="form-control" name="fatal" component="select">
                                    {options}
                                </Field>
                            </div>
                            <div className="col-lg-4">
                                <label className="checkbox-inline">
                                    <Field name="fatalNotiYn" component="input"
                                           type="checkbox"/>主动通知
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>默认启用</label>
                            <div className="col-lg-9">
                                {/*<Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>
                                 <Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>*/}
                                <label className="radio-inline">
                                    <span><Field name="useYn" component="input" type="radio" value="Y"  /></span>
                                    是
                                </label>

                                <label className="radio-inline">
                                    <span><Field  name="useYn" component="input" type="radio" value="N" /></span>
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

CreateThresholdForm = reduxForm({
    form: 'CreateThresholdForm'  // a unique identifier for this form
})(CreateThresholdForm)

// You have to connect() to any reducers that you wish to connect to yourself
CreateThresholdForm = connect(
    state => ({
        initialValues: {useYn:'Y',targetType:1} // pull initial values from account reducer
    })         // bind account loading action creator
)(CreateThresholdForm)

export default CreateThresholdForm
/*
 {
 /!*<div>
 /!*<!/

 </div>*!/
 }*/
