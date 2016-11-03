/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var router = express()
router.post('/admin/list', function (req, resp) {
    var data=querystring.stringify(JSON.parse(req.body.data))

    fetch(baseURL+'/admin/list.do',
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

router.post('/admin/save', function (req, resp) {
    var data=querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL+'/admin/save.do',
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

router.post('/admin/adminIdCheck', function (req, resp) {
    var data=querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL+'/admin/adminIdCheck.do',
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

router.post('/admin/detail', function (req, resp) {
    var data=querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL+'/admin/detail.do',
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

router.post('/admin/delete', function (req, resp) {
    var data=querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL+'/admin/delete.do',
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