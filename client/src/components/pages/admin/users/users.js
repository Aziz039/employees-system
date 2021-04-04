import React, { Component } from 'react';


import UsersView from './UsersView';
// import "../../../../assets/styles/admin"

import i18n from '../../../../core/i18n';
import APP_CONSTANTS, {config} from "../../../../core/app_constants";
import axios from 'axios';

class users extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isLogged: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.isLogged),
            Language: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE),
            usename: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.USER),
            role: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.ROLE),
            all_col: ''
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
        this.getCols();
    }
    getData = async () => {
        this.getCols();
        let targetLink = `${APP_CONSTANTS.CONFIG.APIs.ADMIN.USERS.GET_ALL_USERS}`;
        await axios.get(targetLink, config).then(
          (res) => {
              if (res.data.body) {
                res.data.body.forEach((item, i) => {
                    item.id = i + 1;
                });
                this.setState({
                    ...this.state, // spreading in state for future proofing
                    isLoaded: true,
                    data: res.data
                })
              }
            }
        ).catch(error => {console.log(error);});
    }
    getCols = () => {
        const columns = [
            { field: 'id', headerName: i18n.t('adminUsers.table-header-id'), width: 170, hide: true},
            { field: 'username', headerName: i18n.t('adminUsers.table-header-username'), width: 170, sortable: true}, 
            { field: 'nationalID', headerName: i18n.t('adminUsers.table-header-nationalID'), width: 170 }, 
            { field: 'name', headerName: i18n.t('adminUsers.table-header-name'), width: 170}, 
            { field: 'role', headerName: i18n.t('adminUsers.table-header-role'), width: 170 }, 
            { field: 'nationality', headerName: i18n.t('adminUsers.table-header-nationality'), width: 170 }, 
            { field: 'supervisor', headerName: i18n.t('adminUsers.table-header-supervisor'), width: 170 }, 
            { field: 'branch', headerName: i18n.t('adminUsers.table-header-branch'), width: 170 }, 
            { field: 'userType', headerName: i18n.t('adminUsers.table-header-userType'), width: 170 }, 
            { field: 'totalCustomersCount', headerName: i18n.t('adminUsers.table-header-totalCustomersCount'), width: 170 }, 
            { field: 'todoCustomers', headerName: i18n.t('adminUsers.table-header-todoCustomers'), width: 170 }, 
            { field: 'inProgressCustomers', headerName: i18n.t('adminUsers.table-header-inProgressCustomers'), width: 170 }, 
            { field: 'doneCustomers', headerName: i18n.t('adminUsers.table-header-doneCustomers'), width: 170 }, 
            { field: 'pendingMoney', headerName: i18n.t('adminUsers.table-header-pendingMoney'), width: 170 }, 
            { field: 'collectedMoney', headerName: i18n.t('adminUsers.table-header-collectedMoney'), width: 170 }, 
            { field: 'timestamp', headerName: i18n.t('adminUsers.table-header-timestamp'), width: 170 },
        ];
        this.setState({all_col: columns});
    }
    render() {
        return (
            <div className="container-fluid row userView">
                {   this.state.isLoaded ?
                       <UsersView data={this.state.data.body} cols={this.state.all_col}  />
                        : <p>No data to show!</p>
                }
            </div>
        );
    }
}

export default users;