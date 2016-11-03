/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from './breadCrumbs'
import {Loading, NoData, roleApplicationUse} from '../Tool/Tool'

export default class RealTimeSessionsComponent extends Component {
    constructor(props) {
        super(props)
        this.firstLoad = true
    }

    componentDidMount() {
        $('.select-search').select2();
        $('.datatable-fixed-right').DataTable({
            columnDefs: [
                {
                    orderable: false,
                    targets: [ 7 ]
                },
                {
                    width: "50px",
                    targets: [6]
                }
            ],
            scrollX: true,
            scrollCollapse: true,
            fixedColumns: {
                leftColumns: 1,
                rightColumns: 1
            }
        });
        $('.datatable-header').remove()
        $('.datatable-footer').remove()


    }

    render() {
        const {data, fetching}=this.props
        return (
            <div>
                <fieldset className="content-group">
                    <legend className="text-bold">
                        实时会话搜索
                    </legend>

                    <div className="row search-option-buttons">
                        <div className="col-sm-5">
                            <div className="input-group bootstrap-touchspin"><span className="input-group-btn"><button
                                className="btn btn-default bootstrap-touchspin-down" type="button">SGID组</button></span><span
                                className="input-group-addon bootstrap-touchspin-prefix"
                                style={{display: 'none'}}></span>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="input-group bootstrap-touchspin"><span className="input-group-btn"><button
                                className="btn btn-default bootstrap-touchspin-down"
                                type="button">CSE 引擎组</button></span><span
                                className="input-group-addon bootstrap-touchspin-prefix"
                                style={{display: 'none'}}></span>
                                <select className="select-search">
                                    <option value="AZ">Arizona</option>
                                    <option value="CO">Colorado</option>
                                    <option value="ID">Idaho</option>
                                    <option value="WY">Wyoming</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="row search-option-buttons" style={{marginTop: '20px'}}>
                        <div className="col-sm-3">
                            <div className="input-group bootstrap-touchspin"><span className="input-group-btn"><button
                                className="btn btn-default bootstrap-touchspin-down" type="button">机顶盒号</button></span><span
                                className="input-group-addon bootstrap-touchspin-prefix"
                                style={{display: 'none'}}></span>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="input-group bootstrap-touchspin"><span className="input-group-btn"><button
                                className="btn btn-default bootstrap-touchspin-down"
                                type="button">应用 ID&nbsp;&nbsp;&nbsp;</button></span><span
                                className="input-group-addon bootstrap-touchspin-prefix"
                                style={{display: 'none'}}></span>
                                <select className="select-search">
                                    <option value="AZ">Arizona</option>
                                    <option value="CO">Colorado</option>
                                    <option value="ID">Idaho</option>
                                    <option value="WY">Wyoming</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="input-group bootstrap-touchspin"><span className="input-group-btn"><button
                                className="btn btn-default bootstrap-touchspin-down"
                                type="button">设备类型&nbsp;&nbsp;&nbsp;</button></span><span
                                className="input-group-addon bootstrap-touchspin-prefix"
                                style={{display: 'none'}}></span>
                                <select className="select-search">
                                    <option value="AZ">Arizona</option>
                                    <option value="CO">Colorado</option>
                                    <option value="ID">Idaho</option>
                                    <option value="WY">Wyoming</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-primary btn-sm"><i
                                className="icon-search4 position-left"></i> 搜 索
                            </button>
                        </div>

                    </div>

                </fieldset>

                <fieldset className="content-group">
                    <legend className="text-bold">
                        会话列表
                    </legend>
                    <div className="dataTables_scrollBody" style={{position: 'relative', overflow: 'auto',width: '100%'}}>
                        <table className="table datatable-fixed-right dataTable no-footer no-header no-">
                            <thead>
                            <tr role="row">
                                <th  tabIndex="0" rowSpan="1"
                                    colSpan="1" >SessionID
                                </th>
                                <th  tabIndex="0"  rowSpan="1"
                                    colSpan="1" aria-label="Last Name: activate to sort column ascending"
                                    aria-sort="descending">机顶盒号
                                </th>
                                <th  tabIndex="0"  rowSpan="1"
                                    colSpan="1" aria-label="Status: activate to sort column ascending">设备类型
                                </th>
                                <th tabIndex="0"  rowSpan="1"
                                    colSpan="1" aria-label="Job Title: activate to sort column ascending">应用ID
                                </th>
                                <th  tabIndex="0"  rowSpan="1"
                                    colSpan="1" aria-label="DOB: activate to sort column ascending">CSE组
                                </th>
                                <th tabIndex="0"  rowSpan="1"
                                    colSpan="1" >SG ID
                                </th>
                                <th tabIndex="0"  rowSpan="1"
                                    colSpan="1">状 态
                                </th>
                                <th id="lastTH" className="text-center" rowSpan="1" colSpan="1"
                                    style={{width: '20px'}}>操 作
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" className="odd">
                                <td className="">965236521484</td>
                                <td className="sorting_1">54125698745</td>
                                <td>Andriod_Coship_HC310_0.11</td>
                                <td>20</td>
                                <td>50</td>
                                <td>155</td>
                                <td><span className="label label-success">Active</span></td>
                                <td className="text-center">

                                </td>
                            </tr>
                            <tr role="row" className="even">
                                <td className="">965236521484</td>
                                <td className="sorting_1"><a href="#">54125698745</a></td>
                                <td><a href="#">Andriod_Coship_HC310_0.11</a></td>
                                <td>20</td>
                                <td>50</td>
                                <td>155</td>
                                <td><span className="label label-info">Pending</span></td>
                                <td className="text-center">

                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>



                </fieldset>
            </div>
        )
    }
}