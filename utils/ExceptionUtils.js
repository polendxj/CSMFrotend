/**
 * Created by Administrator on 2016/11/2.
 */
var CatchUncaughtException = function (func, resp) {
    try {
        func()
    } catch (e) {
        if (resp) {
            resp.sendStatus(500)
        }
        logger.error(e.stack)
    }
}

var CatchNot200Exception = function (res,data) {
    if (res.status == 200) {
        return res.json();
    } else {
        logger.error(res.url + ',' + res.status + ',' + res.statusText + ',data:' + data)
        return false;
    }
}

var CatchNotFalseException = function (json,resp) {
    if (!json) {
        resp.sendStatus(500)
    } else {
        resp.send(json)
    }
}

module.exports.uncaughtException = CatchUncaughtException
module.exports.not200Exception = CatchNot200Exception
module.exports.notFalseException = CatchNotFalseException