/**
 * Created by Administrator on 2016/8/3.
 */
import 'babel-core/polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory,IndexRoute,Redirect } from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import SystemManagerCSR from './containers/SystemManagerCSR'
import CreateCSRContainer from './containers/CreateCSRContainer'
import UpdateCSRContainer from './containers/UpdateCSRContainer'
import SoListContainer from './containers/SoListContainer'
import SoRegisterContainer from './containers/SoRegisterContainer'
import SoUpdateContainer from './containers/SoUpdateContainer'
import LoginContainer from './containers/Login'
import GroupListContainer from './containers/GroupListContainer'
import GroupRegisterContainer from './containers/GroupRegisterContainer'
import GroupUpdateContainer from './containers/GroupUpdateContainer'
import CSEListContainer from './containers/CSEListContainer'
import CSERegisterContainer from './containers/CSERegisterContainer'
import CSEUpdateContainer from './containers/CSEUpdateContainer'
import GWListContainer from './containers/GWListContainer'
import GWRegisterContainer from './containers/GWRegisterContainer'
import GWUpdateContainer from './containers/GWUpdateContainer'
import SubappListContainer from './containers/SubappListContainer'
import SubappRegisterContainer from './containers/SubappRegisterContainer'
import SubappUpdateContainer from './containers/SubappUpdateContainer'
import DedicatedListContainer from './containers/DedicatedListContainer'
import DedicatedRegisterContainer from './containers/DedicatedRegisterContainer'
import DedicatedUpdateContainer from './containers/DedicatedUpdateContainer'
import PerssionPageContainer from './containers/PerssionPageContainer'
import CSSServerMonitorContainer from './containers/CSSServerMonitorContainer'
import AdminListContainer from './containers/AdminListContainer'
import AdminRegisterContainer from './containers/AdminRegisterContainer'
import AdminUpdateContainer from './containers/AdminUpdateContainer'
import AdminUpdatePasswordContainer from './containers/AdminUpdatePasswordContainer'
import SEDListContainer from './containers/SEDListContainer'
import SEDUpdateContainer from './containers/SEDUpdateContainer'
import ThresholdListContainer from './containers/ThresholdListContainer'
import ThresholdRegisterContainer from './containers/ThresholdRegisterContainer'
import ThresholdUpdateContainer from './containers/ThresholdUpdateContainer'
import JobHistoryListContainer from './containers/JobHistoryListContainer'
import RealTimeSessionsContainer from './containers/RealTimeSessionsContainer'
import DeviceTypeListContainer from './containers/DeviceTypeListContainer'
import DeviceTypeRegisterContainer from './containers/DeviceTypeRegisterContainer'
import CSEGroupContainer from './containers/CSEGroupContainer'
import configureStore from './store/configureStore'

let store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Dashboard}/>
                <Route path="dashboard" component={Dashboard}/>
                <Route path="/SysManager/Service/CSR" component={SystemManagerCSR} />
                <Route path="/SysManager/Service/CSR/Create" component={CreateCSRContainer} />
                <Route path="/SysManager/Service/CSR/Detail/:csrId" component={UpdateCSRContainer} />
                <Route path="/SysManager/Service/SO" component={SoListContainer} />
                <Route path="/SysManager/Service/SO/Register" component={SoRegisterContainer} />
                <Route path="/SysManager/Service/SO/Detail/:areaId" component={SoUpdateContainer} />
                <Route path="/SysManager/Service/Group" component={GroupListContainer} />
                <Route path="/SysManager/Service/Group/Register" component={GroupRegisterContainer} />
                <Route path="/SysManager/Service/Group/Detail/:groupId" component={GroupUpdateContainer} />
                <Route path="/SysManager/Service/CSE" component={CSEListContainer} />
                <Route path="/SysManager/Service/CSE/Register" component={CSERegisterContainer} />
                <Route path="/SysManager/Service/CSE/Detail/:cssId" component={CSEUpdateContainer} />
                <Route path="/SysManager/Service/GW" component={GWListContainer} />
                <Route path="/SysManager/Service/GW/Register" component={GWRegisterContainer} />
                <Route path="/SysManager/Service/GW/Detail/:gwId" component={GWUpdateContainer} />
                <Route path="/SysManager/Service/Subapp" component={SubappListContainer} />
                <Route path="/SysManager/Service/Subapp/Register" component={SubappRegisterContainer} />
                <Route path="/SysManager/Service/Subapp/Detail/:subAppId/:appId" component={SubappUpdateContainer} />
                <Route path="/SysManager/Service/Dedicated" component={DedicatedListContainer} />
                <Route path="/SysManager/Service/Dedicated/Register" component={DedicatedRegisterContainer} />
                <Route path="/SysManager/Service/Dedicated/Detail/:seq" component={DedicatedUpdateContainer} />
                <Route path="/UserManager/Permission" component={PerssionPageContainer} />
                <Route path="/UserManager/CSSServerMonitor" component={CSSServerMonitorContainer} />
                <Route path="/UserManager/Admin" component={AdminListContainer} />
                <Route path="/UserManager/Admin/Register" component={AdminRegisterContainer} />
                <Route path="/UserManager/Admin/Detail/:adminId" component={AdminUpdateContainer} />
                <Route path="/UserManager/Admin/ModifyPassword/:adminId" component={AdminUpdatePasswordContainer} />
                <Route path="/SysManager/Service/SED" component={SEDListContainer} />
                <Route path="/SysManager/Service/SED/Detail/:agentIp" component={SEDUpdateContainer} />
                <Route path="/Monitor/Alarm/Threshold" component={ThresholdListContainer} />
                <Route path="/Monitor/Alarm/Threshold/Register" component={ThresholdRegisterContainer} />
                <Route path="/Monitor/Alarm/Threshold/Detail/:seq" component={ThresholdUpdateContainer} />
                <Route path="/UserManager/Operation/JobHistoryList" component={JobHistoryListContainer} />
                <Route path="/Monitor/RealTimeSessions" component={RealTimeSessionsContainer} />
                <Route path="/SystemManager/Platform/DeviceType" component={DeviceTypeListContainer} />
                <Route path="/SystemManager/Platform/DeviceType/Register" component={DeviceTypeRegisterContainer} />
                <Route path="/SystemManager/ClusterSetting/CSEGroupContainer" component={CSEGroupContainer} />
                <Route path="/login" component={LoginContainer} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('wrap')
)



