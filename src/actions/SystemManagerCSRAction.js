/**
 * Created by Administrator on 2016/8/19.
 */
import {
    CHANGE_SEARCH1_TYPE,
    GET_SYS_MANAGER_CSR_LIST,
    START_FETCH,
    END_FETCH,
    START_CSR,
    CLOSE_CSR,
    END_FETCH_STATUS,
    START_SAVE_CSR,
    END_SAVE_CSR,
    END_DETAIL_CSR,
    START_DETAIL_CSR
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'
import {
    csr_list,
    page_size,
    csr_status_update,
    csr_save,
    csr_id_check,
    csr_delete,
    csr_detail
} from '../config/NodeConfig'

export function getCSRList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch())
        fetch(csr_list,
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
                    sortColumn: 'RSS_ID',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(json)))
    }
}

export function updateCSR(csrId, status, index) {
    return dispatch=> {
        fetch(csr_status_update,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({rssId: csrId, useYN: status})
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetchCSRStatus(json, index)))
    }

}


export function startFetchCSRStatus(index) {
    return {
        type: START_CSR,
        index: index
    }
}

export function endFetchCSRStatus(json, index) {
    return {
        type: END_FETCH_STATUS,
        json: json,
        index: index
    }
}
/*创建CSR*/
function startCreateCSR() {
    return {
        type: START_SAVE_CSR
    }
}
function endCreateCSR(data) {
    return {
        type: END_SAVE_CSR,
        data: data
    }
}
export function saveNewCSR(data,flag) {
    return dispatch=> {
        if(flag){
            fetch(csr_save,
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
                        dispatch(endCreateCSR(json))
                        SuccessModal('提示!', 'CSR 修改成功')
                        browserHistory.push('/SysManager/Service/CSR')
                    } else {
                        ErrorModal('警告!', '发生错误:' + json.message)
                    }
                })
        }else{
            fetch(csr_id_check,
                {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: 'data=' + JSON.stringify({rssId: data.rssId})
                })
                .then(response=>response.json())
                .then(function (json) {
                    if (json.result == 'SUCCESS' && json.count == 0) {
                        fetch(csr_save,
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
                                    dispatch(endCreateCSR(json))
                                    SuccessModal('提示!', 'CSR 注册成功')
                                    browserHistory.push('/SysManager/Service/CSR')
                                } else {
                                    ErrorModal('警告!', '发生错误:' + json.message)
                                }
                            })
                    } else {
                        dispatch(endCreateCSR(json))
                        ErrorModal('警告!', 'CSR 名称已存在')
                    }
                })
        }


    }
}
/*END 创建CSR*/

/*删除CSR*/
export function deleteCSR(rssId, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(csr_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({rssId: rssId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch())
                    fetch(csr_list,
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
                                sortColumn: 'RSS_ID',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal('警告!', '删除失败:' + json.message)
                }
            })
    }
}
function endDeleteCsr(data) {
    return {
        type: START_FETCH,
        data
    }
}
/*END 删除CSR*/

/*获取某个CSR详情*/
export function csrDetail(rssId) {
    return dispatch=> {
        dispatch(startDetailCsr())
        fetch(csr_detail,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({rssId: rssId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endDetailCsr(json))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal('警告!', '删除失败:' + json.message)
                }
            })
    }
}

function startDetailCsr() {
    return {
        type: START_DETAIL_CSR
    }
}

function endDetailCsr(data) {
    return {
        type: END_DETAIL_CSR,
        data
    }
}
/*END 获取某个CSR详情*/
function startFetch() {
    return {
        type: START_FETCH
    }
}

function endFetch(json) {
    return {
        type: END_FETCH,
        json
    }
}
