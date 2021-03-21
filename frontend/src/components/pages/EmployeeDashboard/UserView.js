import React, { Component } from 'react';
import axios from 'axios';

import APP_CONSTANTS, {config} from "../../../core/app_constants";
import i18n from '../../../core/i18n';

import '../../../assets/styles/employeeDashboard/userView.css'

class UserView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usename: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.USER),
            isLogged: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.isLogged),
            Language: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE),
            data:[]
        }
        i18n.changeLanguage(this.state.Language);
    }
    async componentDidMount() {
        if (this.state.isLogged) {
            this.getData();
        } else {
            window.location.href = "/login";
        }
    }
    getData = async () => {
        let targetLink = `${APP_CONSTANTS.CONFIG.APIs.USERS.GET_USER}/${sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.USER)}`;
        await axios.get(targetLink, config).then(
          (res) => 
                this.setState({
                        ...this.state, // spreading in state for future proofing
                        isLoaded: true,
                        data: res.data.body[0]
                })
        ).catch(error => {console.log(error);});
    }
    render() {
        return (
                <div className="container">
                    <div className="row userView">
                        <div className="col-sm-4">
                            <div className="card-header mr-auto">{i18n.t("EmployeeDashboard.userView-name")}</div>
                            <div className="card-body">
                                <input className="form-control userViewInput" type="text" placeholder={`${this.state.data.name}`} disabled />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="card-header">{i18n.t("EmployeeDashboard.userView-supervisor")}</div>
                            <div className="card-body">
                                <input className="form-control userViewInput" type="text" placeholder={`${this.state.data.supervisor}`} disabled />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="card-header">{i18n.t("EmployeeDashboard.userView-branch")}</div>
                            <div className="card-body">
                                <input className="form-control userViewInput" type="text" placeholder={`${this.state.data.branch}`} disabled />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="card-header">{i18n.t("EmployeeDashboard.userView-todo")}</div>
                            <div className="card-body">
                                <input className="form-control userViewInput" type="text" placeholder={`${this.state.data.todoCustomers}`} disabled />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="card-header">{i18n.t("EmployeeDashboard.userView-inporgress")}</div>
                            <div className="card-body">
                                <input className="form-control userViewInput" type="text" placeholder={`${this.state.data.inProgressCustomers}`} disabled />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="card-header">{i18n.t("EmployeeDashboard.userView-done")}</div>
                            <div className="card-body">
                                <input className="form-control userViewInput" type="text" placeholder={`${this.state.data.doneCustomers}`} disabled />
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default UserView;