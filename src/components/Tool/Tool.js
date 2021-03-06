/**
 * Created by Administrator on 2016/8/29.
 */
import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import classnames from 'classnames';
import {browserHistory} from 'react-router'

export class Loading extends Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <button type="button" className="btn btn-default"
                        style={{border: '0 red solid', background: 'transparent', fontSize: '20px'}}><i
                    className="icon-spinner9 spinner position-left" style={{fontSize: '20px'}}></i> 数据加载中...
                </button>
            </div>
        )
    }
}

export class NoData extends Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <button type="button" className="btn btn-default"
                        style={{border: '0 red solid', background: 'transparent', fontSize: '20px'}}>不存在任何数据...
                </button>
            </div>

        )
    }
}

export function ConfirmModal(title, content, callback) {
    swal({
        title: title,
        text: content,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FF7043",
        confirmButtonText: "确认"
    }, function (confirm) {
        if (confirm) {
            callback()
        }
    });
}

export class FormModal extends Component {
    _ensureBtn() {
        this.props.doAction()
    }

    render() {
        return (
            <div id="FormModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h5 className="modal-title">{this.props.tip}</h5>
                        </div>

                        <div className="modal-body">
                            {this.props.content}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-link" data-dismiss="modal">取 消</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                    onClick={this._ensureBtn.bind(this)}>确 定
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export function showWarningNotification(header, content) {
    PNotify.desktop.permission();
    (new PNotify({
            title: header,
            type: 'warning',
            text: content,
            desktop: {
                desktop: true,
                icon: '/assets/images/pnotify/warning.png'
            }
        })
    );
}

export function showSuccessNotification(header, content) {
    PNotify.desktop.permission();
    (new PNotify({
            title: header,
            type: 'success',
            text: content,
            desktop: {
                desktop: true,
                icon: '/assets/images/pnotify/warning.png'
            }
        })
    );
}

export function CreateNodeChart(nodes, links, payload) {
    var width = 300,
        height = 300,
        colors = d3.scale.category10();

    var svg = d3.select('#' + payload)
        .append('svg')
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 300 300")
    // [
    // {id: 'dadsada', reflexive: false},
    // {id: 1, reflexive: false},
    // {id: 2, reflexive: false},
    // {id: 3, reflexive: false},
    // {id: 4, reflexive: false},
    // {id: 5, reflexive: false}
    // ]

    // [
    // {source: nodes[0], target: nodes[1], left: false, right: true},
    // {source: nodes[1], target: nodes[2], left: false, right: true}
    // ]
    var nodes = nodes,
        links = links;

    var force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .size([width, height])
        .linkDistance(150)
        .charge(-500)
        .on('tick', tick)

    svg.append('svg:defs').append('svg:marker')
        .attr('id', 'end-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 6)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#000');
    svg.append('svg:defs').append('svg:marker')
        .attr('id', 'start-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 4)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M10,-5L0,0L10,5')
        .attr('fill', '#000');

    var path = svg.append('svg:g').selectAll('path'),
        circle = svg.append('svg:g').selectAll('g');
    var selected_node = null,
        selected_link = null,
        mousedown_link = null,
        mousedown_node = null,
        mouseup_node = null;

    function resetMouseVars() {
        mousedown_node = null;
        mouseup_node = null;
        mousedown_link = null;
    }

    function tick() {
        path.attr('d', function (d) {
            var deltaX = d.target.x - d.source.x,
                deltaY = d.target.y - d.source.y,
                dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
                normX = deltaX / dist,
                normY = deltaY / dist,
                sourcePadding = d.left ? 17 : 12,
                targetPadding = d.right ? 17 : 12,
                sourceX = d.source.x + (sourcePadding * normX),
                sourceY = d.source.y + (sourcePadding * normY),
                targetX = d.target.x - (targetPadding * normX),
                targetY = d.target.y - (targetPadding * normY);
            return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
        });

        circle.attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });
    }

    function restart() {
        path = path.data(links);

        path.classed('selected', function (d) {
            return d === selected_link;
        })
            .style('marker-start', function (d) {
                return d.left ? 'url(#start-arrow)' : '';
            })
            .style('marker-end', function (d) {
                return d.right ? 'url(#end-arrow)' : '';
            });

        path.enter().append('svg:path')
            .attr('class', 'link')
            .classed('selected', function (d) {
                return d === selected_link;
            })
            .style('marker-start', function (d) {
                return d.left ? 'url(#start-arrow)' : '';
            })
            .style('marker-end', function (d) {
                return d.right ? 'url(#end-arrow)' : '';
            })
        circle = circle.data(nodes, function (d) {
            return d.id;
        });
        circle.selectAll('circle')
            .style('fill', function (d) {
                return (d === selected_node) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id);
            })
            .classed('reflexive', function (d) {
                return d.reflexive;
            });
        var g = circle.enter().append('svg:g');

        g.append('svg:circle')
            .attr('class', 'node')
            .attr('r', 12)
            .style('fill', function (d) {
                return (d === selected_node) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id);
            })
            .style('stroke', function (d) {
                return d3.rgb(colors(d.id)).darker().toString();
            })
            .classed('reflexive', function (d) {
                return d.reflexive;
            })
            .on('mouseover', function (d) {
                if (!mousedown_node || d === mousedown_node) return;
                // enlarge target node
                d3.select(this).attr('transform', 'scale(1.1)');
            })
        // show node IDs
        g.append('svg:text')
            .attr('x', 0)
            .attr('y', 4)
            .attr('class', 'id')
            .text(function (d) {
                return d.id;
            });
        circle.exit().remove();
        force.start();
    }

    restart();
}

export function DecodeBase64(data) {
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    return decode(data);

    function decode(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    function _utf8_decode(utftext) {
        var string = "";
        var i = 0;
        var c = 0, c1 = 0, c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
export function EncodeBase64(form) {
    // base64 인코딩 함수 (자바스크립트에서 인코딩 해서 넘김)
    var InStr = form;
    var ttb = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var len_1 = InStr.length;
    var len_res = InStr.length % 3;
    var len_div = len_1 - len_res;
    var ra = new makeArray(4);
    var i = 0;
    var Stat = "";
    var str = "";
    while (1) {
        if (i >= len_1)
            break;

        if (i >= len_div)
            Stat = "End";
        var A = eval(InStr.charCodeAt(i++));
        var B = eval(InStr.charCodeAt(i++));
        var C = eval(InStr.charCodeAt(i++));
        if (i > len_div) {
            Stat = "End";
            if (len_res >= 1)
                C = 0;
            if (len_res == 1)
                B = 0;
        }
        ra[1] = A >> 2;
        ra[2] = ((A & 3) << 4) + (B >> 4);
        ra[3] = ((B & 15) << 2) + (C >> 6);
        ra[4] = C & 63;
        if (Stat == "End" && len_res >= 1)
            ra[4] = 64;
        if (Stat == "End" && len_res == 1)
            ra[3] = 64;
        for (var k = 1; k <= 4; k++)
            str = str + ttb.substr(ra[k], 1);
    }

    return str;

}

function makeArray(n) {
    this.length = n
    for (var i = 1; i <= n; i++) {
        this[i] = null;
    }
    return this
}

export function SuccessModal(title, content, link) {
    swal({
        title: title,
        text: content,
        confirmButtonColor: "#66BB6A",
        type: "success",
        timer: 2000
    });

}

export function ErrorModal(title, content) {
    swal({
        title: title,
        text: content,
        confirmButtonColor: "#EF5350",
        type: "error"
    });
}

export function DealingModal(title) {
    swal({
        title: title,
        confirmButtonColor: "transparent"
    });
}

export function audioCodes(num) {
    // 0 - AAC, 1 - AC3, 2 - MPEG-2
    if (num == 0) {
        return 'ACC'
    } else if (num == 1) {
        return 'AC3'
    } else if (num == 2) {
        return 'MPEG-2'
    }
}

export function videoCodes(num) {
    //-	Video Codec : 0 - 264, 1 - MPEG-2
    if (num == 0) {
        return '264'
    } else if (num == 1) {
        return 'MPEG-2'
    }
}

export function alarmTargetTypeFilter(targetType) {
    //-	Video Codec : 0 - 264, 1 - MPEG-2
    if (targetType == "1") {
        return "CPU";
    } else if (targetType == "2") {
        return "Memory";
    } else if (targetType == "3") {
        return "Network";
    } else if (targetType == "4") {
        return "Disk";
    } else {
        return "Unknown";
    }
}

export function roleApplicationUse(obj, type) {
    var result = true
    var rules = JSON.parse(sessionStorage['rules'])
    if (type) {

    } else {
        for (var rule in rules) {
            if (rule == obj && (rules[rule] == false || rules[rule] == 'false')) {
                result = false
            }
        }
    }
    return result
}

