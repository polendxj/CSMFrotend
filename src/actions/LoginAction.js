/**
 * Created by Administrator on 2016/8/19.
 */
import {START_LOGIN, END_LOGIN} from '../constants/index'
import {browserHistory} from 'react-router'
import fetch from 'isomorphic-fetch'
import {ErrorModal} from '../components/Tool/Tool'
import {
    cs_login
} from '../config/NodeConfig'

export function login(data) {
    return dispatch=> {
        dispatch(startLogin())
        fetch(cs_login,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    sessionStorage['auth'] = json.admin.adminName
                    sessionStorage['rules'] = JSON.stringify(json.permission)
                    var date = new Date();
                    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
                    var dateString = date.toUTCString();
                    var cookieString = "JSESSIONID=" + json.sessionId + "; expires=" + dateString + "; path=/;";
                    document.cookie = cookieString;
                    console.log(document.cookie)
                    browserHistory.push('/')
                    dispatch(endLogin(json))
                } else {
                    ErrorModal("错误！用户名或者密码不正确...")
                    sessionStorage['auth'] = ''
                }
            })
        dispatch(endLogin())
    }
}

function startLogin(menu) {
    return {
        type: START_LOGIN,
        menu
    }
}

function endLogin(data) {
    return {
        type: END_LOGIN,
        data
    }
}