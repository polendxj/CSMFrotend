/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_DEVICE_TYPE_LIST,
    END_DEVICE_TYPE_LIST
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'
import {
    device_type_list,
    device_type_save,
    page_size
} from '../config/NodeConfig'

export function getDeviceTypeList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_DEVICE_TYPE_LIST))
        fetch(device_type_list,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({
                    startRow: startRow,
                    endRow: page_size,
                    page: '',
                    searchColumn: searchColumn,
                    searchValue: searchValue,
                    sortColumn: 'BROWSER',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_DEVICE_TYPE_LIST, json)))
    }
}

export function saveDeviceType(data, flag) {
    return dispatch=> {
        dispatch(startFetch(START_DEVICE_TYPE_LIST))
        fetch(device_type_save,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_DEVICE_TYPE_LIST, json))
                    browserHistory.push('/SystemManager/Platform/DeviceType')
                    if (!flag) {
                        SuccessModal('提示!', '注册设备类型成功')
                    } else {
                        SuccessModal('提示!', '修改设备类型成功')
                    }
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })

    }
}


function startFetch(type) {
    return {
        type: type
    }
}

function endFetch(type, json) {
    return {
        type: type,
        json
    }
}
