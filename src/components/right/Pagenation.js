/**
 * Created by Administrator on 2016/8/29.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class Search1 extends Component {
    constructor(props) {
        super(props)
        this.lastStart = 0
        this.lastEnd = 0
    }

    render() {
        var nums = 0
        var pages = []
        var clazz = ''
        if (this.props.counts) {
            nums = parseInt((this.props.counts / 20)+1)
            for (let i = 0; i < nums; i++) {
                clazz = classnames({"paginate_button": true, "current": this.props.page == i})
                pages.push(<a key={'page' + i} className={clazz}
                              aria-controls="DataTables_Table_2"
                              data-dt-idx={i + 1} tabIndex="0"
                              onClick={this.props._changePage.bind(this, i)}>{i + 1}</a>)
            }
        }
        var filterPages = []

        var cpage = this.props.page + 1
        if (cpage < 10) {
            filterPages = pages.slice(0, 10);
            this.lastStart = 0;
            this.lastEnd = 10;
        } else {
            if (cpage % 10 === 0) {
                filterPages = pages.slice(cpage - 2, cpage + 9);
                this.lastStart = cpage - 2;
                this.lastEnd = cpage + 9;
            } else if (cpage % 10 === 9) {
                if (cpage - 10 < 0) {
                    filterPages = pages.slice(0, cpage + 1);
                    this.lastStart = 0;
                    this.lastEnd = cpage + 1;
                } else {
                    filterPages = pages.slice(cpage - 11, cpage + 2);
                    this.lastStart = cpage - 11;
                    this.lastEnd = cpage + 2;
                }
            } else {
                filterPages = pages.slice(this.lastStart, this.lastEnd);
            }
        }
        return (
            <div className="datatable-footer">
                <div className="dataTables_info" id="DataTables_Table_2_info" role="status" aria-live="polite">
                    显示第 {this.props.page * 20 + 1}&nbsp;
                    到 &nbsp;{(this.props.page * 20 + 20) >= this.props.counts ? this.props.counts : (this.props.page * 20 + 20)}&nbsp;
                    条 / 共 {this.props.counts ? this.props.counts : '0'} 条
                </div>
                <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_2_paginate">
                    <a href="javascript:void(0);" style={{display: this.props.page == 0 ? 'none' : 'inline-block'}}
                       className="paginate_button previous" onClick={this.props._prePage.bind(this, 0)}>←</a>
                    <span>
                        {filterPages}
                    </span>
                    <a href="javascript:void(0);"
                       style={{display: (this.props.page + 1) == nums ? 'none' : 'inline-block'}}
                       className="paginate_button next" onClick={this.props._nextPage.bind(this, 0)}>→</a></div>
            </div>

        )
    }
}