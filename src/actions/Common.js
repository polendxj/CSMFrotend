/**
 * Created by Administrator on 2016/8/19.
 */
import {
    END_REFRESH
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'
import {
    admin_list,
    admin_save,
    admin_adminIdCheck,
    admin_detail,
    admin_delete,
    page_size
} from '../config/NodeConfig'

export function commonRefresh() {
    return dispatch=> {
        dispatch(startFetch(END_REFRESH))
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
