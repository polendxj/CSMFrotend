/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_DEDICATED_LIST,
    END_DEDICATED_LIST,
    START_DEDICATED_SAVE,
    END_DEDICATED_SAVE,
    START_DEDICATED_DETAIL,
    END_DEDICATED_DETAIL,
    END_DEDICATED_AREA_SUBINFO
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'
import {
    dedicated_dedicatedIdCheck,
    dedicated_delete,
    dedicated_detail,
    dedicated_list,
    dedicated_save,
    dedicated_area_subinfo,
    page_size
} from '../config/NodeConfig'

export function getDedicatedList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_DEDICATED_LIST))
        fetch(dedicated_list,
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
                    sortColumn: 'STB_ID',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_DEDICATED_LIST, json)))
    }
}

export function saveDedicated(data, flag) {
    return dispatch=> {
        console.log(data)
        dispatch(startFetch(START_DEDICATED_SAVE))
        fetch(dedicated_save,
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
                    dispatch(endFetch(END_DEDICATED_SAVE, json))
                    browserHistory.push('/SysManager/Service/Dedicated')
                    if (!flag) {
                        SuccessModal('提示!', '注册专用通道成功')
                    } else {
                        SuccessModal('提示!', '修改专用通道成功')
                    }
                } else {
                    ErrorModal('警告!', '发生错误: ' + json.message)
                }
            })

    }
}
export function deleteDedicated(id, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(dedicated_delete,
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
                    dispatch(startFetch(START_DEDICATED_LIST))
                    fetch(dedicated_list,
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
                                sortColumn: 'STB_ID',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_DEDICATED_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal('警告!', '删除失败:' + json.message)
                }
            })
    }
}

export function detailDedicated(dedicatedId) {
    return dispatch=> {
        dispatch(startFetch(START_DEDICATED_DETAIL))
        fetch(dedicated_detail,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({seq: dedicatedId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_DEDICATED_DETAIL, json))
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })

    }
}

export function areaSubInfoDedicated() {
    return dispatch=> {
        fetch(dedicated_area_subinfo,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.area.result == 'SUCCESS') {
                    dispatch(endFetch(END_DEDICATED_AREA_SUBINFO, json))
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })

    }
}


function dedicatedIdCheck(dedicatedId, callback, flag) {
    if (!flag) {
        fetch(dedicated_dedicatedIdCheck,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({dedicatedId: dedicatedId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    if (json.count > 0) {
                        ErrorModal('警告!', '发生错误:区域ID已经存在')
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
