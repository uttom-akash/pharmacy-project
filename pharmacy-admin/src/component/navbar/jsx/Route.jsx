import React from 'react'
import { Switch, Route } from 'react-router-dom'

import DashBoard from '../../page/jsx/DashBoard'
import PendingOrder from '../../page/jsx/PendingOrder'
import AddUser from '../../page/jsx/AddUser'
import  AddAdmin from '../../page/jsx/AddAdmin'
import AddEmployee from '../../page/jsx/AddEmplyee'
import AddMenufecturer from '../../page/jsx/AddMenufecturer'
import  AddSupplier from '../../page/jsx/AddSupplier'
import NewSupply from '../../page/jsx/NewSupply'
import NewDrug from '../../page/jsx/NewDrug'
import GetOrder from '../../page/jsx/GetOrders'
import SalesReport from '../../analysis/jsx/SalesReport'
import ProfitReport from '../../analysis/jsx/ProfitReport'
export default () => {
    return (
        <Switch>
            <Route path="/" exact component={DashBoard} />
            <Route path="/pending-order" exact component={PendingOrder} />
            <Route path="/get-order" exact component={GetOrder} />
            <Route path="/add-user" exact component={AddUser} />
            <Route path="/add-admin" exact component={AddAdmin} />
            <Route path="/add-employee" exact component={AddEmployee} />
            <Route path="/add-menufecturer" exact component={AddMenufecturer} />

            <Route path="/add-supplier" exact component={AddSupplier} />
            <Route path="/new-supply" exact component={NewSupply} />
            <Route path="/new-drug" exact component={NewDrug} />

            <Route path="/sales-report" exact component={SalesReport} />
            <Route path="/profit-report" exact component={ProfitReport} />



        </Switch>
    )
}