/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_CSE_LIST,
    END_CSE_LIST,
    START_CSE_SAVE,
    END_CSE_SAVE,
    START_CSE_DETAIL,
    END_CSE_DETAIL,
    END_AREA_LIST,
    END_CSE_STATUS_UPDATE
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'
import {
    cse_list,
    cse_save,
    cse_cseIdCheck,
    cse_detail,
    cse_delete,
    area_list,
    cse_status_update,
    page_size
} from '../config/NodeConfig'

export function getCSEList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_CSE_LIST))
        fetch(cse_list,
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
                    sortColumn: 'HOST_NAME',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_CSE_LIST, json)))
    }
}

export function getAreaList() {
    console.log(document.cookie)
    return dispatch=> {
        fetch(area_list,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_AREA_LIST, json)))
    }
}

export function saveCSE(data, flag) {
    return dispatch=> {
        dispatch(startFetch(START_CSE_SAVE))
        fetch(cse_save,
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
                    dispatch(endFetch(END_CSE_SAVE, json))
                    browserHistory.push('/SysManager/Service/CSE')
                    if (!flag) {
                        SuccessModal('提示!', '注册CSE成功')
                    } else {
                        SuccessModal('提示!', 'CSE应用配置成功')
                    }
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })

    }
}
export function deleteCSE(id, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(cse_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({areaId: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_CSE_LIST))
                    fetch(cse_list,
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
                                sortColumn: 'HOST_NAME',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_CSE_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal('警告!', '删除失败:' + json.message)
                }
            })
    }
}

export function detailCSE(id) {
    return dispatch=> {
        dispatch(startFetch(START_CSE_DETAIL))
        fetch(cse_detail,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({cssId: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_CSE_DETAIL, json))
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })

    }
}

export function updateCSEStatus(id,status,startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_CSE_DETAIL))
        fetch(cse_status_update,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({cssId: id,useYN:status})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_CSE_LIST))
                    fetch(cse_list,
                        {
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
                                sortColumn: 'HOST_NAME',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_CSE_LIST, json)))
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })

    }
}


function cseIdCheck(id, callback, flag) {
    if (!flag) {
        fetch(cse_cseIdCheck,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({areaId: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    if (json.count > 0) {
                        ErrorModal('警告!', '发生错误:CSE ID已经存在')
                    } else {
                        callback()
                    }
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })
    } else {
        callback()
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
