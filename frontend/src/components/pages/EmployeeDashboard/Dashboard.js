import React, { Component } from 'react';
import axios from 'axios';
import i18n from '../../../core/i18n';
import APP_CONSTANTS, {config} from "../../../core/app_constants";

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
            { key: i18n.t('EmployeeDashboard.table_column_id'), accessor: "id", Header: i18n.t('EmployeeDashboard.table_column_id'), minWidth: 170, fixed: "left" }, // 
            { key: i18n.t('EmployeeDashboard.table_column_customerName'), accessor: "customerName", Header: i18n.t('EmployeeDashboard.table_column_customerName'), minWidth: 100 }, //
            { key: i18n.t('EmployeeDashboard.table_column_nationalID'), accessor: "nationalID", Header: i18n.t('EmployeeDashboard.table_column_nationalID'), minWidth: 100 }, //
            { key: i18n.t('EmployeeDashboard.table_column_cost'), accessor: "cost", Header: i18n.t('EmployeeDashboard.table_column_cost'), minWidth: 100 }, //
            { key: i18n.t('EmployeeDashboard.table_column_discount'), accessor: "discount", Header: i18n.t('EmployeeDashboard.table_column_discount'), minWidth: 100 },
            { key: i18n.t('EmployeeDashboard.table_column_costAfterDiscount'), accessor: "costAfterDiscount", Header: i18n.t('EmployeeDashboard.table_column_costAfterDiscount'), minWidth: 100 },
            { key: i18n.t('EmployeeDashboard.table_column_lastBillDate'), accessor: "lastBillDate", Header: i18n.t('EmployeeDashboard.table_column_lastBillDate'), minWidth: 100 }, //
            { key: i18n.t('EmployeeDashboard.table_column_firstBillDate'), accessor: "firstBillDate", Header: i18n.t('EmployeeDashboard.table_column_firstBillDate'), minWidth: 100 },
            { key: i18n.t('EmployeeDashboard.table_column_phone1'), accessor: "phone1", Header: i18n.t('EmployeeDashboard.table_column_phone1'), minWidth: 100 }, //
            { key: i18n.t('EmployeeDashboard.table_column_phone2'), accessor: "phone2", Header: i18n.t('EmployeeDashboard.table_column_phone2'), minWidth: 100 },
            { key: i18n.t('EmployeeDashboard.table_column_phone3'), accessor: "phone3", Header: i18n.t('EmployeeDashboard.table_column_phone3'), minWidth: 100 },
            { key: i18n.t('EmployeeDashboard.table_column_phone4'), accessor: "phone4", Header: i18n.t('EmployeeDashboard.table_column_phone4'), minWidth: 100 },
            { key: i18n.t('EmployeeDashboard.table_column_phone5'), accessor: "phone5", Header: i18n.t('EmployeeDashboard.table_column_phone5'), minWidth: 100 },
            { key: i18n.t('EmployeeDashboard.table_column_phone6'), accessor: "phone6", Header: i18n.t('EmployeeDashboard.table_column_phone6'), minWidth: 100 },
            { key: i18n.t('EmployeeDashboard.table_column_phone7'), accessor: "phone7", Header: i18n.t('EmployeeDashboard.table_column_phone7'), minWidth: 100 },
            { key: i18n.t('EmployeeDashboard.table_column_phone8'), accessor: "phone8", Header: i18n.t('EmployeeDashboard.table_column_phone8'), minWidth: 100 },
            { key: i18n.t('EmployeeDashboard.table_column_collecterUsername'), accessor: "collecterUsername", Header: i18n.t('EmployeeDashboard.table_column_collecterUsername'), minWidth: 100 }, 
            { key: i18n.t('EmployeeDashboard.table_column_attributionDate'), accessor: "attributionDate", Header: i18n.t('EmployeeDashboard.table_column_attributionDate'), minWidth: 100 }, //
            { key: i18n.t('EmployeeDashboard.table_column_status'), accessor: "status", Header: i18n.t('EmployeeDashboard.table_column_status'), minWidth: 100 }, //
            { key: i18n.t('EmployeeDashboard.table_column_notes'), accessor: "notes", Header: i18n.t('EmployeeDashboard.table_column_notes'), minWidth: 100 }, //
            { key: i18n.t('EmployeeDashboard.table_column_paymentDate'), accessor: "paymentDate", Header: i18n.t('EmployeeDashboard.table_column_paymentDate'), minWidth: 100 }, //
            { key: i18n.t('EmployeeDashboard.table_column_newStatus'), accessor: "newStatus", Header: i18n.t('EmployeeDashboard.table_column_newStatus'), minWidth: 100 },
            { key: i18n.t('EmployeeDashboard.table_column_newPaymentDate'), accessor: "newPaymentDate", Header:i18n.t('EmployeeDashboard.table_column_newPaymentDate'), minWidth: 100 },
            { key: i18n.t('EmployeeDashboard.table_column_newNotes'), accessor: "newNotes", Header: i18n.t('EmployeeDashboard.table_column_newNotes'), minWidth: 100 },
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