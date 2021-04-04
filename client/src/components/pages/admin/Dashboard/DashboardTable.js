import React, { Component } from 'react';
import axios from 'axios';

import i18n from '../../../../core/i18n';
import APP_CONSTANTS, {config} from "../../../../core/app_constants";

class DashboardTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usename: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.USER),
            customersCount:[],
        }
    }
    
    componentDidMount () {
        this.getData();
    }

    getData = async () => {
        await axios.get(APP_CONSTANTS.CONFIG.APIs.ADMIN.CMS.GET_CUSTOMERS_COUNT, config).then(
          (res) => this.setState({
                ...this.state, // spreading in state for future proofing
                isLoaded: true,
                customersCount: res.data.body
            })
        ).catch(error => {console.log(error);});
        await axios.get(APP_CONSTANTS.CONFIG.APIs.ADMIN.CMS.CUSTOMERS_BILL_COST, config).then(
            (res) => this.setState({
                  ...this.state, // spreading in state for future proofing
                  isLoaded: true,
                  totalBills: res.data.body['SUM(costAfterDiscount)']
              })
        ).catch(error => {console.log(error);});
        await axios.get(APP_CONSTANTS.CONFIG.APIs.ADMIN.CMS.USERS_COLLECTED_MONEY, config).then(
            (res) => this.setState({
                ...this.state, // spreading in state for future proofing
                isLoaded: true,
                collectedMoney: res.data.body['SUM(collectedMoney)']
            })
        ).catch(error => {console.log(error);});
        await axios.get(APP_CONSTANTS.CONFIG.APIs.ADMIN.CMS.USERS_PENDING_MONEY, config).then(
            (res) => this.setState({
                ...this.state, // spreading in state for future proofing
                isLoaded: true,
                pendingMoney: res.data.body['SUM(pendingMoney)']
            })
        ).catch(error => {console.log(error);});
        this.addFields();
    }

    addFields = () => {
        document.getElementById("newCustomers").value = this.state.customersCount["new"];
        document.getElementById("inprogressCustomers").value = this.state.customersCount["in progress"];
        document.getElementById("completeCustomers").value = this.state.customersCount["complete"];
        document.getElementById("totalBills").value = this.state.totalBills;
        document.getElementById("collectedMoney").value = this.state.collectedMoney;
        document.getElementById("pendingMoney").value = this.state.pendingMoney;
    }
    
    render() {
        return (
            <div className="adminDashView col-md-7">
                <form className="customer-form">
                    <div className="row" >
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-6">{i18n.t("adminDashboard.DashboardTable-header-new-customers")}</p>
                            <input className="col-md-6" type="text" id="newCustomers" name="newCustomers" readOnly/>
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-6">{i18n.t("adminDashboard.DashboardTable-header-inprogress-customers")}</p>
                            <input className="col-md-6" type="text" id="inprogressCustomers" name="inprogressCustomers" readOnly/>
                        </div>
                        <div className="col-md-4 customer-form-content ">
                            <p className="col-md-6">{i18n.t("adminDashboard.DashboardTable-header-complete-customers")}</p>
                            <input className="col-md-6" type="text" id="completeCustomers"  name="completeCustomers" readOnly />
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-6">{i18n.t("adminDashboard.DashboardTable-header-total-bills")}</p>
                            <input className="col-md-6" type="text" id="totalBills" name="totalBills" readOnly/>
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-6">{i18n.t("adminDashboard.DashboardTable-header-collected-money")}</p>
                            <input className="col-md-6" type="text" id="collectedMoney" name="collectedMoney" readOnly/>
                        </div>
                        <div className="col-md-4 customer-form-content ">
                            <p className="col-md-6">{i18n.t("adminDashboard.DashboardTable-header-pending-money")}</p>
                            <input className="col-md-6" type="text" id="pendingMoney"  name="pendingMoney" readOnly />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default DashboardTable;