/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var router = express()
router.post('/gw/list', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/gateway/list.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            resp.send(json)
        });
});

router.post('/gw/save', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/gateway/save.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            resp.send(json)
        });
});

router.post('/gw/gwIdCheck', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/gateway/gatewayIdCheck.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            resp.send(json)
        });
});

router.post('/gw/detail', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    var count = 0
    var result = {detail: "", stat: "", config: ""}
    fetch(baseURL + '/gateway/detail.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            result.detail=json
            count++;
            if(count==3){
                resp.send(result)
            }
        });
    fetch(baseURL + '/gateway/config.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            result.config=json
            count++;
            if(count==3){
                resp.send(result)
            }
        });
    fetch(baseURL + '/gateway/stat.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            result.stat=json
            count++;
            if(count==3){
                resp.send(result)
            }
        });
});

router.post('/gw/delete', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/gateway/delete.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            resp.send(json)
        });
});

router.post('/gw/updateGatewayStatus', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/gateway/updateGatewayStatus.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            resp.send(json)
        });
});

module.exports = router