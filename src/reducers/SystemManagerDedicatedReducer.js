/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {
    START_DEDICATED_LIST,
    END_DEDICATED_LIST,
    START_DEDICATED_SAVE,
    END_DEDICATED_SAVE,
    START_DEDICATED_DETAIL,
    END_DEDICATED_DETAIL,
    END_DEDICATED_AREA_SUBINFO
} from '../constants/index'

export function getSysManagerDedicatedList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_DEDICATED_LIST:
            state = {...state, fetching: true};
            return state;
        case END_DEDICATED_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function dedicatedSave(state = {data: {}, fetching: false,areaSubInfo:{}}, action) {
    switch (action.type) {
        case START_DEDICATED_SAVE:
            state = {...state, fetching: true};
            return state;
        case END_DEDICATED_SAVE:
            state = {data: action.json, fetching: false};
            return state;
        case END_DEDICATED_AREA_SUBINFO:
            state = {areaSubInfo: action.json};
            return state;
        default:
            return state;
    }
}

export function dedicatedDetail(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_DEDICATED_DETAIL:
            state = {data: {}, fetching: true};
            return state;
        case END_DEDICATED_DETAIL:
            state = {fetching: false, data: action.json};
            return state;
        default:
            return state;
    }
}
