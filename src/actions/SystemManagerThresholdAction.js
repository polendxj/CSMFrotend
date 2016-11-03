/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_THRESHOLD_LIST,
    END_THRESHOLD_LIST,
    START_THRESHOLD_SAVE,
    END_THRESHOLD_SAVE,
    START_THRESHOLD_DETAIL,
    END_THRESHOLD_DETAIL,
    END_THRESHOLD_STATUS_UPDATE
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'
import {
    threshold_list,
    threshold_save,
    threshold_thresholdIdCheck,
    threshold_detail,
    threshold_delete,
    page_size
} from '../config/NodeConfig'

export function getThresholdList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_THRESHOLD_LIST))
        fetch(threshold_list,
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
                    sortColumn: 'THRESHOLD_NAME',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_THRESHOLD_LIST, json)))
    }
}

export function saveThreshold(data, flag) {
    return dispatch=> {
        dispatch(startFetch(START_THRESHOLD_SAVE))
        fetch(threshold_save,
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
                    dispatch(endFetch(END_THRESHOLD_SAVE, json))
                    browserHistory.push('/Monitor/Alarm/Threshold')
                    if (!flag) {
                        SuccessModal('提示!', '注册告警阈值成功')
                    } else {
                        SuccessModal('提示!', '修改告警阈值成功')
                    }
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })

    }
}
export function deleteThreshold(id, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(threshold_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({seq: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_THRESHOLD_LIST))
                    fetch(threshold_list,
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
                                sortColumn: 'THRESHOLD_NAME',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_THRESHOLD_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal('警告!', '删除失败:' + json.message)
                }
            })
    }
}

export function detailThreshold(id) {
    return dispatch=> {
        dispatch(startFetch(START_THRESHOLD_DETAIL))
        fetch(threshold_detail,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({seq: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_THRESHOLD_DETAIL, json))
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })

    }
}

export function updateThresholdStatus(data, status, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(threshold_save,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_THRESHOLD_LIST))
                    fetch(threshold_list,
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
                                sortColumn: 'THRESHOLD_NAME',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_THRESHOLD_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal('警告!', '删除失败:' + json.message)
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
