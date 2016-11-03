/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';
import {Loading} from '../../../components/Tool/Tool'


export default class RegisterDedicatedComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const CreateDedicatedForm = require('../../ReduxForm/CreateDedicatedForm')
        var content = ""
        if (this.props.areaSubInfo && this.props.areaSubInfo.area && this.props.areaSubInfo.area.result == 'SUCCESS') {
            content = <CreateDedicatedForm _save={this.props._save} areaSubInfo={this.props.areaSubInfo}/>
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