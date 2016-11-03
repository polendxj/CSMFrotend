/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes} from '../components/Tool/Tool'
import {
    START_DEVICE_TYPE_LIST,
    END_DEVICE_TYPE_LIST,
    END_DEVICE_TYPE_SAVE,
    START_DEVICE_TYPE_SAVE
} from '../constants/index'

export function getDeviceTypeList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_DEVICE_TYPE_LIST:
            state = {...state, fetching: true};
            return state;
        case END_DEVICE_TYPE_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function deviceTypeSave(state = {data: {}, fetching: false, areaList: []}, action) {
    switch (action.type) {
        case START_DEVICE_TYPE_SAVE:
            state = {...state, fetching: true};
            return state;
        case END_DEVICE_TYPE_SAVE:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
//
// export function adminDetail(state = {data: {}, fetching: false}, action) {
//     switch (action.type) {
//         case START_ADMIN_DETAIL:
//             state = {data: {}, fetching: true};
//             return state;
//         case END_ADMIN_DETAIL:
//
//             state = {fetching: false, data: action.json};
//             return state;
//         default:
//             return state;
//     }
// }
