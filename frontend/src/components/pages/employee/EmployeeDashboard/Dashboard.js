import React, { Component } from 'react';
import axios from 'axios';
import i18n from '../../../../core/i18n';
import APP_CONSTANTS, {config} from "../../../../core/app_constants";

import UserView from './UserView';
import CustomersView from './customersView';


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogged: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.isLogged),
            Language: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE),
            all_col: ''
        }
        i18n.changeLanguage(this.state.Language);
    }
    async componentDidMount() {
        if (this.state.isLogged) {
            i18n.changeLanguage(this.state.Language);
            if (this.state.Language === "en") {
                document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
                this.setState({NavDir: "mr-auto"});
            } else {
                document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
                this.setState({NavDir: "ml-auto"});
            }
            this.getData();
            this.getCols();
        } else {
            window.location.href = "/login";
        }
    }
    getData = async () => {
        this.getCols();
        let targetLink = `${APP_CONSTANTS.CONFIG.APIs.CMS.GET_ALL_CUSTOMERS}/${sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.USER)}`;
        await axios.get(targetLink, config).then(
          (res) => {
              if (res.data.body) {
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
            { field: 'id', headerName: i18n.t('EmployeeDashboard.table_column_id'), width: 170, fixed: "left" }, 
            { field: 'customerName', headerName: i18n.t('EmployeeDashboard.table_column_customerName'), width: 170 }, 
            { field: 'nationalID', headerName: i18n.t('EmployeeDashboard.table_column_nationalID'), width: 170, hide: true }, 
            { field: 'cost', headerName: i18n.t('EmployeeDashboard.table_column_cost'), width: 170, hide: true }, 
            { field: "discount", headerName: i18n.t('EmployeeDashboard.table_column_discount'), width: 170, hide: true },
            { field: "costAfterDiscount", headerName: i18n.t('EmployeeDashboard.table_column_costAfterDiscount'), width: 170 },
            { field: "lastBillDate", headerName: i18n.t('EmployeeDashboard.table_column_lastBillDate'), width: 170 }, 
            { field: "firstBillDate", headerName: i18n.t('EmployeeDashboard.table_column_firstBillDate'), width: 170, hide: true  },
            { field: "phone1", headerName: i18n.t('EmployeeDashboard.table_column_phone1'), width: 170, hide: true }, 
            { field: "phone2", headerName: i18n.t('EmployeeDashboard.table_column_phone2'), width: 170, hide: true  },
            { field: "phone3", headerName: i18n.t('EmployeeDashboard.table_column_phone3'), width: 170, hide: true  },
            { field: "phone4", headerName: i18n.t('EmployeeDashboard.table_column_phone4'), width: 170, hide: true  },
            { field: "phone5", headerName: i18n.t('EmployeeDashboard.table_column_phone5'), width: 170, hide: true  },
            { field: "phone6", headerName: i18n.t('EmployeeDashboard.table_column_phone6'), width: 170, hide: true  },
            { field: "phone7", headerName: i18n.t('EmployeeDashboard.table_column_phone7'), width: 170, hide: true  },
            { field: "phone8", headerName: i18n.t('EmployeeDashboard.table_column_phone8'), width: 170, hide: true  },
            { field: "collecterUsername", headerName: i18n.t('EmployeeDashboard.table_column_collecterUsername'), width: 170, hide: true  }, 
            { field: "attributionDate", headerName: i18n.t('EmployeeDashboard.table_column_attributionDate'), width: 170 }, 
            { field: "status", headerName: i18n.t('EmployeeDashboard.table_column_status'), width: 170 }, 
            { field: "notes", headerName: i18n.t('EmployeeDashboard.table_column_notes'), width: 170, hide: true }, 
            { field: "paymentDate", headerName: i18n.t('EmployeeDashboard.table_column_paymentDate'), width: 170, hide: true }, 
            { field: "newStatus", headerName: i18n.t('EmployeeDashboard.table_column_newStatus'), width: 170, hide: true },
            { field: "newPaymentDate", headerName:i18n.t('EmployeeDashboard.table_column_newPaymentDate'), width: 170, hide: true  },
            { field: "newNotes", headerName: i18n.t('EmployeeDashboard.table_column_newNotes'), width: 170, hide: true  },
            { field: "customerStatus", headerName: i18n.t('EmployeeDashboard.table_column_customerStatus'), width: 170},
        ];
        this.setState({all_col: columns});
    }
    render() {
        return (
            <div>
                <UserView />
                {   this.state.isLoaded ?
                        <CustomersView data={this.state.data.body} cols={this.state.all_col}  />
                        : <p>No data to show!</p>
                }
            </div>
        );
    }
}

export default Dashboard;