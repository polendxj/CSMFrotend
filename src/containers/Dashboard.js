/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Highcharts from 'highcharts'
import SessionAndUsersChartsComponent from '../components/charts/SessionAndUsersChartsComponent'
import {
    ccu_status,
    css_server_used,
    active_user_of_so,
    server_use_of_app,
    alarm_history_list
} from '../config/NodeConfig'
import {alarmTargetTypeFilter} from '../components/Tool/Tool'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.SessionAndUsersContainerTimer = ""
        this.ServerUseStatusContainerTimer = ""
        this.SoUserContainerTimer = ""
        this.AppUseServerContainerTimer = ""
        this.alarmHistoryContainerTimer = ""
    }

    componentDidMount() {
        var that = this
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        $('#SessionAndUsersContainer').highcharts({
            chart: {
                zoomType: 'x',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        that.SessionAndUsersContainerTimer = setInterval(function () {
                            var x = (new Date()).getTime()// current time

                            fetch(ccu_status,
                                {
                                    credentials: 'include',
                                    method: 'GET',
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                })
                                .then(response=>response.json())
                                .then(function (json) {
                                    console.log(json)
                                    if (json.result == 'SUCCESS') {
                                        series.addPoint([x, json.totalUser], true, true);
                                        $("#SessionAndUsersActiveUser").text(json.totalUser)
                                        $("#SessionAndUsersMaxUser").text(json.maxUser)
                                        $("#totalActiveUser").text(json.totalUser)
                                    } else {

                                    }

                                })
                        }, 3000);
                    }
                }
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: '活跃用户（个）'
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: 0
                        });
                    }
                    return data;
                }())
            }]
        });

        $('#ServerUseStatusContainer').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                events: {
                    load: function () {
                        // set up the updating of the chart each second
                        that.ServerUseStatusContainerTimer = setInterval(function () {
                            fetch(css_server_used,
                                {
                                    credentials: 'include',
                                    method: 'GET',
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                })
                                .then(response=>response.json())
                                .then(function (json) {
                                    console.log(json)
                                    if (json.result == 'SUCCESS') {
                                        var brand = new Array();
                                        brand = ("正在使用,等待使用,停止使用").split(',');
                                        //设置统计数据
                                        var brand_chart = $('#ServerUseStatusContainer').highcharts();

                                        //设置x轴数据
                                        // brand_chart.xAxis[0].setCategories(['40', '41', '42']);
                                        brand_chart.series[0].setData([json.used / json.total, json.unused / json.total, json.stopped / json.total]);

                                        $("#ServerUseStatusTotal").text(json.total)
                                        $("#ServerUseStatusUsed").text(json.used)
                                        $("#ServerUseStatusUnused").text(json.unused)
                                        $("#ServerUseStatusStopped").text(json.stopped)
                                    } else {

                                    }

                                })
                        }, 3000);
                    }
                }
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: '正在使用',
                    y: 0,
                    sliced: true,
                    selected: true,
                    color: '#7CB5EC'
                }, {
                    name: '等待使用',
                    y: 0,
                    color: 'lightgray'
                }, {
                    name: '停止使用',
                    y: 0,
                    color: 'red'
                }]
            }]
        });

        $('#SoUserContainer').highcharts({
            chart: {
                type: 'column',
                events: {
                    load: function () {
                        // set up the updating of the chart each second
                        that.SoUserContainerTimer = setInterval(function () {
                            fetch(active_user_of_so,
                                {
                                    credentials: 'include',
                                    method: 'GET',
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                })
                                .then(response=>response.json())
                                .then(function (json) {
                                    console.log(json)
                                    if (json.result == 'SUCCESS') {
                                        var brand = new Array();
                                        brand = json.areaName;
                                        //设置统计数据
                                        var brand_chart = $('#SoUserContainer').highcharts();

                                        //设置x轴数据
                                        brand_chart.xAxis[0].setCategories(json.areaName);

                                        //设置柱状图数据
                                        var temp = []
                                        json.soUsers.forEach(function (val) {
                                            temp.push(parseInt(val))
                                        })
                                        brand_chart.series[0].setData(eval("(" + JSON.stringify(temp) + ")"));
                                        // $("#SessionAndUsersActiveUser").text(json.totalUser)
                                    } else {


                                    }

                                })

                        }, 3000);
                    }
                }
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'CSS使用占比（%）'
                }

            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
            },

            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: '- -',
                    y: 0
                }]
            }]
        });

        $('#AppUseServerContainer').highcharts({
            chart: {
                type: 'column',
                events: {
                    load: function () {
                        // set up the updating of the chart each second
                        that.AppUseServerContainerTimer = setInterval(function () {
                            fetch(server_use_of_app,
                                {
                                    credentials: 'include',
                                    method: 'GET',
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                })
                                .then(response=>response.json())
                                .then(function (json) {
                                    console.log(json)
                                    if (json.result == 'SUCCESS') {
                                        var brand = new Array();
                                        brand = ("服务器总数,使用服务器数,未使用服务器数").split(',');
                                        //设置统计数据
                                        var brand_chart = $('#AppUseServerContainer').highcharts();

                                        //设置x轴数据
                                        brand_chart.xAxis[0].setCategories(json.xAxisList);

                                        //设置柱状图数据
                                        var i = 0;
                                        $.each(brand, function (key, val) {
                                            //设置 X 数据
                                            if (i == 0) {
                                                var temp = []
                                                json.dataAllList.forEach(function (val) {
                                                    temp.push(parseInt(val))
                                                })
                                                brand_chart.series[i].setData(temp);

                                            } else if (i == 1) {
                                                var temp = []
                                                json.dataUseList.forEach(function (val) {
                                                    temp.push(parseInt(val))
                                                })
                                                brand_chart.series[i].setData(temp);

                                            } else if (i == 2) {
                                                var temp = []
                                                json.dataNotuseList.forEach(function (val) {
                                                    temp.push(parseInt(val))
                                                })
                                                brand_chart.series[i].setData(temp);
                                            }
                                            i++;
                                        });
                                        // $("#SessionAndUsersActiveUser").text(json.totalUser)
                                    } else {

                                    }

                                })

                        }, 3000);
                    }
                }
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: [
                    '--'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: '使用服务器 (个)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} 个</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: '服务器总数',
                data: [0]

            }, {
                name: '使用服务器数',
                data: [0]

            }, {
                name: '未使用服务器数',
                data: [0]

            }]
        });

        this.alarmHistoryContainerTimer = setInterval(function () {
            fetch(alarm_history_list,
                {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "data=" + JSON.stringify({
                        startRow: 0,
                        endRow: 5,
                        page: '',
                        searchColumn: 'DETECT_LEVEL',
                        searchValue: '',
                        sortColumn: 'REG_DATE',
                        orderType: 'ASC'
                    })
                })
                .then(response=>response.json())
                .then(function (json) {
                    console.log(json)
                    $("#dashboardAlarm").html("")
                    if (json.result == 'SUCCESS') {
                        if (json.alarmHistoryList.length > 0) {
                            json.alarmHistoryList.forEach(function (val, key) {
                                $("#dashboardAlarm").append('<tr><td class="text-center" style="width:20%"><h6 class="no-margin">' + val.regDate + '</h6></td><td style="width:10%"><div class="media-body"><div class="text-muted text-size-small"><span class="status-mark border-blue position-left"></span> ' + val.detectLevel + '</div></div></td><td style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><span style="font-size:12px">[' + alarmTargetTypeFilter(val.targetType) + ']' + val.detectValue + '</span></td></tr>')
                            })
                        } else {
                            $("#dashboardAlarm").append('<tr><td colspan="3"><div style="text-align: center;height:200px;padding-top: 100px"><button type="button" class="btn btn-default" style="border: 0 red solid; background:transparent;font-size:20px">暂无告警信息... </button> </div></td></tr>')
                        }
                    } else {

                    }

                })
        }, 2000)

    }

    componentWillUnmount() {
        clearInterval(this.SessionAndUsersContainerTimer)
        clearInterval(this.ServerUseStatusContainerTimer)
        clearInterval(this.SoUserContainerTimer)
        clearInterval(this.AppUseServerContainerTimer)
        clearInterval(this.alarmHistoryContainerTimer)
    }

    render() {
        return (
            <div>
                <div className="content" style={{marginTop: '20px'}}>
                    <div className="panel panel-flat">
                        <div className="panel-body">
                            <SessionAndUsersChartsComponent />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}