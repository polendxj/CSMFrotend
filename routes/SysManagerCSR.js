/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var router = express()

router.post('/csr/list', function (req, resp) {
    try {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/csr/list.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: data
            })
            .then(function (res) {
                try {
                    return res.json();
                }catch (e){
                    res.send(e.stack)
                }
            })
            .then(function (json) {
                try {
                    resp.send(json)
                }catch (e){
                    res.send(e.stack)
                }

            });
    }catch(e){
        logger.error(e.stack)
    }

});

router.post('/csr/updateCsrStatus', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/csr/updateCsrStatus.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            console.log(res)
            return res.json();
        })
        .then(function (json) {
            console.log(json)
            resp.send(json)
        });
});

router.post('/csr/csrIdCheck', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/csr/csrIdCheck.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            console.log(res)
            return res.json();
        })
        .then(function (json) {
            console.log(json)
            resp.send(json)
        });
});

router.post('/csr/save', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/csr/save.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            console.log(res)
            return res.json();
        })
        .then(function (json) {
            console.log(json)
            resp.send(json)
        });
});

router.post('/csr/delete', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/csr/delete.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            console.log(res)
            return res.json();
        })
        .then(function (json) {
            console.log(json)
            resp.send(json)
        });
});

router.post('/csr/detail', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/csr/detail.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            console.log(res)
            return res.json();
        })
        .then(function (json) {
            console.log(json)
            resp.send(json)
        });
});


module.exports = router