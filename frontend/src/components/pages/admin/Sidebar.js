import React, { Component } from 'react';

import "../../../assets/styles/admin/adminDashboard.css"

import i18n from '../../../core/i18n';
import APP_CONSTANTS, {config} from "../../../core/app_constants";

class Sidebar extends Component {
    render() {
        return (
            <nav className="col-md-2 d-none d-md-block bg-light sidebar admin-navbar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                {i18n.t("adminDashboard.navbar-header-users")}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                {i18n.t("adminDashboard.navbar-header-customers")}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                {i18n.t("adminDashboard.navbar-header-dataManagement")}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Sidebar;