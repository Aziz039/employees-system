import React, { Component } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';


import "../../../../assets/styles/admin/adminDashboard.css"
import "../../../../assets/styles/admin/adminSideBar.scss"


import i18n from '../../../../core/i18n';
import APP_CONSTANTS, {config} from "../../../../core/app_constants";
// navbar-dark  bg-primary
class Sidebar extends Component {
    render() {
        return (
            <div className="vh-100 adminSidebar">
                <ProSidebar className="adminSidebar">
                    <Menu iconShape="square">
                        <MenuItem >Dashboard</MenuItem>
                        <SubMenu title="Components">
                        <MenuItem>Component 1</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                        </SubMenu>
                    </Menu>
                </ProSidebar>
            </div>
        );
    }
}

export default Sidebar;