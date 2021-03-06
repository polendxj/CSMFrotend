/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_SERVER_RESOURCE_LIST,
    END_SERVER_RESOURCE_LIST,

} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'
import {
    server_resource_list,
    page_size
} from '../config/NodeConfig'

export function getServerResourceList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_SERVER_RESOURCE_LIST))
        fetch(server_resource_list,
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
            .then(json=>dispatch(endFetch(END_SERVER_RESOURCE_LIST, json)))
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
