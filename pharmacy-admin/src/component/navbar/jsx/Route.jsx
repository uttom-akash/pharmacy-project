import React from 'react'
import { Switch, Route } from 'react-router-dom'

import DashBoard from '../../page/jsx/DashBoard'
import Notification from '../../page/jsx/Notification'
import AddUser from '../../page/jsx/AddUser'
import  AddAdmin from '../../page/jsx/AddAdmin'
import AddEmployee from '../../page/jsx/AddEmplyee'
import AddMenufecturer from '../../page/jsx/AddMenufecturer'
import  AddSupplier from '../../page/jsx/AddSupplier'
import NewSupply from '../../page/jsx/NewSupply'
import NewDrug from '../../page/jsx/NewDrug'


export default () => {
    return (
        <Switch>
            <Route path="/" exact component={DashBoard} />
            <Route path="/notification" exact component={Notification} />
            <Route path="/add-user" exact component={AddUser} />
            <Route path="/add-admin" exact component={AddAdmin} />
            <Route path="/add-employee" exact component={AddEmployee} />
            <Route path="/add-menufecturer" exact component={AddMenufecturer} />

            <Route path="/add-supplier" exact component={AddSupplier} />
            <Route path="/new-supply" exact component={NewSupply} />
            <Route path="/new-drug" exact component={NewDrug} />
        </Switch>
    )
}