var express = require('express');
var path = require('path');
var ejs = require('ejs');
var http = require('http');
var serveStatic = require('serve-static')
var cluster = require('cluster')
var numCPUs = require('os').cpus().length;
var favicon = require('serve-favicon')
var cookieSession = require('cookie-session')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var urllib = require('url');
var process=require('process')

var log4js = require('log4js');
log4js.configure({
    appenders: [
        {type: 'console'}, //控制台输出
        {
            type: 'file', //文件输出
            filename: 'd://CSCenterNode.log',
            maxLogSize: 1024 * 1024,
            backups: 3,
            category: 'main'
        }
    ]
});
logger = log4js.getLogger('main');
logger.setLevel('INFO');
baseURL = require('./config/config').production_csm_url

var SysManagerCSR = require('./routes/SysManagerCSR')
var SysManagerSO = require('./routes/SysManagerSO')
var SysManagerLogin = require('./routes/SysManagerLogin')
var SysManagerSGroup = require('./routes/SysManagerGroup')
var SysManagerSubApp = require('./routes/SysManagerSubApp')
var SysManagerCSE = require('./routes/SysManagerCSE')
var SysManagerGW = require('./routes/SysManagerGW')
var SysManagerMonitor = require('./routes/SysManagerMonitor')
var SysManagerDedicated = require('./routes/SysManagerDedicated')
var SysManagerPermission = require('./routes/SysManagerPermission')
var Admin = require('./routes/Admin')
var AlarmHistory = require('./routes/AlarmHistory')
var SysManagerSED = require('./routes/SysManagerSED')
var SysManagerThreshold = require('./routes/SysManagerThreshold')
var JobHistory = require('./routes/JobHistory')
var ServiceModel = require('./routes/ServiceModel')

if (cluster.isMaster) {
    console.log('[master] ' + "start master...");

    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });

} else if (cluster.isWorker) {
    console.log('[worker] ' + "start worker ..." + cluster.worker.id);
    var app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cookieParser())
    app.use(SysManagerCSR)
    app.use(SysManagerSO)
    app.use(SysManagerLogin)
    app.use(SysManagerSGroup)
    app.use(SysManagerSubApp)
    app.use(SysManagerCSE)
    app.use(SysManagerGW)
    app.use(SysManagerMonitor)
    app.use(SysManagerDedicated)
    app.use(SysManagerPermission)
    app.use(Admin)
    app.use(AlarmHistory)
    app.use(SysManagerSED)
    app.use(SysManagerThreshold)
    app.use(JobHistory)
    app.use(ServiceModel)
    app.use(express.static(path.join(__dirname, 'build')));
    app.set('port',3000);
    app.get('*', function(request, response, next) {
        response.sendFile(__dirname+'/build/index.html');
    });
    var server = app.listen(app.get('port'),function(req,res) {
        console.log('worker'+cluster.worker.id);
    });
    process.on('uncaughtException', function (err) {
        //打印出错误
        console.log(err);
        //打印出错误的调用栈方便调试
        console.log(err.stack);
    });
}
module.exports = app;
