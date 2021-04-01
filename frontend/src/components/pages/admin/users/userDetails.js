import React, { Component } from 'react';

import "../../../../assets/styles/admin/adminDashboard.css"

import i18n from '../../../../core/i18n';
import APP_CONSTANTS, {config} from "../../../../core/app_constants";
import axios from 'axios';

class userDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogged: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.isLogged),
            Language: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE),
            usename: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.USER),
            role: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.ROLE),
            all_col: '',
            targetedUsername: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.targetedUsername),
            passwordCheck: false
        }
    }
    componentDidMount() {
        if (this.state.isLogged && this.state.role === "admin") {
            i18n.changeLanguage(this.state.Language);
            if (this.state.Language === "en") {
                document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
                this.setState({NavDir: "mr-auto"});
            } else {
                document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
                this.setState({NavDir: "ml-auto"});
            }
        } else {
            window.location.href = "/login";
        }
        this.getData();
    }
    getData = async () => {
        let targetLink = `${APP_CONSTANTS.CONFIG.APIs.ADMIN.USERS.GET_A_USER}/${this.state.targetedUsername}`;
        await axios.get(targetLink, config).then(
          (res) => 
                this.setState({
                    ...this.state, // spreading in state for future proofing
                    isLoaded: true,
                    data: res.data.body[0]
                })
        ).catch(error => {console.log(error);});
        this.setDataFields();
    }
    setDataFields = () => {
        Object.keys(this.state.data).map((key, index) => {
            document.getElementById(key).value = this.state.data[key];
            return key;
        })
    }
    handleSave = async(e) => {
        e.preventDefault();
        if (this.state.passwordCheck) {
            let targetLink = `${APP_CONSTANTS.CONFIG.APIs.ADMIN.USERS.MODIFY_PASS}${this.state.targetedUsername}`;
            console.log(targetLink);
            let quesry_pass = { "content": { "password": document.getElementById('password').value } }
            await axios.put(targetLink, quesry_pass, config).then((response) => {
                console.log(response);
            }).catch(error => console.log(error));
        }
        let targetedLink = `${APP_CONSTANTS.CONFIG.APIs.ADMIN.USERS.MODIFY_USER}${this.state.targetedUsername}`;
        let query = {
            content: {
                username:document.getElementById('username').value,
                nationalID: document.getElementById('nationalID').value,
                name: document.getElementById('name').value,
                role: document.getElementById('role').value,
                nationality: document.getElementById('nationality').value,
                supervisor: document.getElementById('supervisor').value,
                branch: document.getElementById('branch').value,
                userType: document.getElementById('userType').value
            }
        }
        await axios.put(targetedLink, query, config).then((response) => {
            console.log(response);
        }).catch(error => console.log(error));
        window.location.href = "/AdminDashboard"
    }
    render() {
        return (
            <div className="customer-wrapper">
                <form className="customer-form">
                    <div className="row" >
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-username")}</p>
                            <input className="col-md-6 adminInputField" type="text" id="username" name="username"/>
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-name")}</p>
                            <input className="col-md-6 adminInputField" type="text" id="name" name="name" />
                        </div>
                        <div className="col-md-4 customer-form-content ">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-role")}</p>
                            <select id="role" className="col-md-6 adminInputField">
                                <option value="admin">admin</option>
                                <option value="supervisor">supervisor</option>
                                <option value="employee">employee</option>
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div className="row" >
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-nationalID")}</p>
                            <input className="col-md-6 adminInputField" type="text" id="nationalID" name="nationalID"/>
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-nationality")}</p>
                            <input className="col-md-6 adminInputField" type="text" id="nationality" name="nationality" />
                        </div>
                    </div>
                    <hr />
                    <div className="row" >
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-supervisor")}</p>
                            <input className="col-md-6 adminInputField" type="text" id="supervisor" name="supervisor"/>
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-branch")}</p>
                            <input className="col-md-6 adminInputField" type="text" id="branch" name="branch" />
                        </div>
                        <div className="col-md-4 customer-form-content ">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-userType")}</p>
                            <input className="col-md-6 adminInputField" type="text" id="userType"  name="userType" />
                        </div>
                    </div>
                    <hr />
                    <div className="row" >
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-totalCustomersCount")}</p>
                            <input className="col-md-6 adminInputField" type="text" id="totalCustomersCount" name="totalCustomersCount" readOnly/>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-todoCustomers")}</p>
                            <input className="col-md-6 adminInputField" type="text" id="todoCustomers" name="todoCustomers" readOnly/>
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-inProgressCustomers")}</p>
                            <input className="col-md-6 adminInputField" type="text" id="inProgressCustomers" name="inProgressCustomers" readOnly />
                        </div>
                        <div className="col-md-4 customer-form-content ">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-doneCustomers")}</p>
                            <input className="col-md-6 adminInputField" type="text" id="doneCustomers"  name="doneCustomers" readOnly/>
                        </div>
                    </div>
                    <hr />
                    <div className="row" >
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-pendingMoney")}</p>
                            <input className="col-md-6 adminInputField" type="text" id="pendingMoney" name="pendingMoney" readOnly/>
                        </div>
                        <div className="col-md-4 customer-form-content ">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-collectedMoney")}</p>
                            <input className="col-md-6 adminInputField" type="text" id="collectedMoney"  name="collectedMoney" readOnly/>
                        </div>
                    </div>
                    <hr />
                    <div className="row" >
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-timestamp")}</p>
                            <input className="col-md-6 adminInputField" type="text" id="timestamp" name="timestamp" readOnly/>
                        </div>
                    </div>
                    <hr />
                    <div className="row" >
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("adminUsers.table-header-password")}</p>
                            <input className="col-md-6 adminInputField" type="password" id="password" name="password" readOnly/>
                        </div>
                        <div class="col-md-2  customer-form-content custom-checkbox">
                            <input type="checkbox" class="col-sm-1  custom-control-input" id="passwordCheck" onClick={event => {
                                this.setState({passwordCheck: event.target.checked});
                                if (!event.target.checked) {
                                    document.getElementById("password").readOnly = true;
                                    document.getElementById("password").value = "";
                                } else {
                                    document.getElementById("password").readOnly = false;
                                }
                            }}/>
                            <label class="col-md-10 custom-control-label" for="passwordCheck">{i18n.t("adminUsers.table-header-password-box")}</label>
                        </div>
                    </div>
                    <hr />
                    <div className="row justify-content-md-center" >
                        <input className="col-md-2 btn btn-primary" value={i18n.t("customerDetails.form-header-button")} type="submit" onClick={this.handleSave}/>
                    </div>
                </form>
            </div>
        );
    }
}

export 
default userDetails;