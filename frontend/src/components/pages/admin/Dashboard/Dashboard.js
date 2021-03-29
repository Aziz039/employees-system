import React, { Component } from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';
import DashboardTable from './DashboardTable';

import "../../../../assets/styles/admin/adminDashboard.css"

import i18n from '../../../../core/i18n';
import APP_CONSTANTS, {config} from "../../../../core/app_constants";

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogged: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.isLogged),
            Language: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE),
            role: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.ROLE)
        }
        i18n.changeLanguage(this.state.Language);
    }
    async componentDidMount() {
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
    }
    render() {
        return (
            <div className="container-fluid row">
                <Sidebar />
                <DashboardTable />
            </div>
        );
    }
}

export default Dashboard;