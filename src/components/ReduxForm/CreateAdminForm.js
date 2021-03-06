/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let CreateAdminForm  = (props) => {
    const {placeholder}=props
    return (
        <div className="row">
            <form className="form-horizontal" action="#">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>管理员姓名</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="adminName" component="input" type="text"
                                       placeholder={'姓名'} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>账 号</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="adminId" component="input" type="text"
                                       placeholder={'账号'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>密 码</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="adminPwd" component="input" type="password"
                                       placeholder={'密码'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>确认密码</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="adminPwd2" component="input" type="password"
                                       placeholder={'两次密码输入必须一致...'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>联系电话</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="phoneNumber" component="input" type="text"
                                       placeholder={'联系电话'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>权 限</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="permissionId" component="select">
                                    <option value={'SV'}>管理员（SV）</option>
                                    <option value={'MSO_OP'}>MSO管理员（MSO OP）</option>
                                    <option value={'SO_OP'}>SO管理员（SO OP）</option>
                                    <option value={'GU'}>普通用户（GU）</option>
                                </Field>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>默认启用</label>
                            <div className="col-lg-9">
                                {/*<Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>
                                 <Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>*/}
                                <label className="radio-inline">
                                    <span><Field name="useYN" component="input" type="radio" value="Y"  /></span>
                                    是
                                </label>

                                <label className="radio-inline">
                                    <span><Field  name="useYN" component="input" type="radio" value="N" /></span>
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

CreateAdminForm = reduxForm({
    form: 'CreateAdminForm'  // a unique identifier for this form
})(CreateAdminForm)

// You have to connect() to any reducers that you wish to connect to yourself
CreateAdminForm = connect(
    state => ({
        initialValues: {useYN:'Y'} // pull initial values from account reducer
    })         // bind account loading action creator
)(CreateAdminForm)

export default CreateAdminForm
/*
 {
 /!*<div>
 /!*<!/

 </div>*!/
 }*/
