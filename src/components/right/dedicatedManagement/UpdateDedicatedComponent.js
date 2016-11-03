/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {Loading} from '../../../components/Tool/Tool'

export default class UpdateDedicatedComponent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const UpdateDedicatedForm = require('../../ReduxForm/UpdateDedicatedForm')
        var content = ""
        if (this.props.areaSubInfo && this.props.areaSubInfo.area && this.props.areaSubInfo.area.result == 'SUCCESS' && this.props.detailDedicated && this.props.detailDedicated.result=='SUCCESS') {
            content = <UpdateDedicatedForm _save={this.props._save} areaSubInfo={this.props.areaSubInfo}/>
        } else {
            content = <Loading />
        }
        return (
            <div>
                {content}
            </div>
        )

    }
}