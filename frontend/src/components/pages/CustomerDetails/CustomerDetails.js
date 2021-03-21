import React, { Component } from 'react';
import axios from 'axios';

import APP_CONSTANTS, {config, allCols, allNotes, statusOptions} from "../../../core/app_constants";
import i18n from '../../../core/i18n';

import '../../../assets/styles/customerDashboard/style.css';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class CustomerDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usename: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.USER),
            targetedCustomer: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.targetedCustomerId),
            isLogged: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.isLogged),
            Language: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE),
            statusOptions: statusOptions,
            allNotes: allNotes,
            data:[]
        }
        i18n.changeLanguage(this.state.Language);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeNewDate = this.handleChangeNewDate.bind(this);
    }
    componentDidMount() {
        if (this.state.isLogged) {
            try {
                if (this.state.targetedCustomer) {
                    this.getData();
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            window.location.href = "/login"
        }
    }

    getData = async() => {
        let targetLink = `${APP_CONSTANTS.CONFIG.APIs.CMS.GET_CUSTOMER}${this.state.usename}/${this.state.targetedCustomer}`;
        await axios.get(targetLink, config)
            .then((res) => this.setState({
                ...this.state, 
                data: res.data.body[0]
            }))
            .catch(error => {
                console.log(error);
            });
        this.setDataFields();
    }

    
    setDataFields = () => {
        allCols.map(field => {
            if (field === "customerStatus" || field === "timestamp") {
            } else { 
                document.getElementById(field).value = this.state.data[field];
            }
            return true;
        });
        this.setState({
            selectedStatusOption: this.state.data.status,
            selectedNewStatusOption: this.state.data.newStatus,
            selectedNotesOption: this.state.data.notes,
            selectedNewNotesOption: this.state.data.newNotes,
        });
        document.getElementById("status").value = this.state.data["status"];
        document.getElementById("notes").value = this.state.data["notes"];
        document.getElementById("newStatus").value = this.state.data["newStatus"];
        document.getElementById("newNotes").value = this.state.data["newNotes"];
        document.getElementById("customerStatus").value = this.state.data["customerStatus"];
        if (this.state.data.paymentDate && this.state.data.newPaymentDate) {
            let day1 = parseInt(this.state.data.paymentDate.slice(0, 2));
            let month1 = parseInt(this.state.data.paymentDate.slice(3,5)) - 1; // month starts from 0
            let year1 = parseInt(this.state.data.paymentDate.slice(6));
            let date1 = new Date(year1, month1, day1);
            let day2 = parseInt(this.state.data.newPaymentDate.slice(0, 2));
            let month2 = parseInt(this.state.data.newPaymentDate.slice(3,5)) - 1; // month starts from 0
            let year2 = parseInt(this.state.data.newPaymentDate.slice(6));
            let date2 = new Date(year2, month2, day2);
            this.setState({
                paymentDatePicker: date1,
                newPaymentDatePicker: date2,
        });

        } else if (this.state.data.paymentDate) {
            let day1 = parseInt(this.state.data.paymentDate.slice(0, 2));
            let month1 = parseInt(this.state.data.paymentDate.slice(3,5)) - 1; // month starts from 0
            let year1 = parseInt(this.state.data.paymentDate.slice(6));
            let date1 = new Date(year1, month1, day1);
            this.setState({
                paymentDatePicker: date1,
            });
        } else if (this.state.data.newPaymentDate) {
            let day2 = parseInt(this.state.data.newPaymentDate.slice(0, 2));
            let month2 = parseInt(this.state.data.newPaymentDate.slice(3,5)) - 1; // month starts from 0
            let year2 = parseInt(this.state.data.newPaymentDate.slice(6));
            let date2 = new Date(year2, month2, day2);
            this.setState({
                newPaymentDatePicker: date2,
            });
        }
    }
    changeSelectStatusOptionHandler = (event) => {
        this.setState({selectedStatusOption: event.target.value})
        
    }
    changeSelectNotesOptionHandler = (event) => { 
        console.log(event.target.value);
        this.setState({selectedNotesOption: event.target.value})
    }; 
    handleDropdownChangeNotes  = (X) => {
        if (X === this.state.selectedStatusOption) {
            if (X === 'PTP') {
                return this.state.allNotes[0].map(value => {return <option value={value}>{value}</option>})
            } else if (X === 'CB') {
                return this.state.allNotes[1].map(value => {return <option value={value}>{value}</option>})
            } else if (X === 'RJCT') {
                return this.state.allNotes[2].map(value => {return <option value={value}>{value}</option>})
            } else if (X === 'NA') {
                return this.state.allNotes[3].map(value => {return <option value={value}>{value}</option>})
            } else {
                return <option value=" ">none</option>
            }
        } else {
            return;
        }
        
    };
    changeSelectNewStatusOptionHandler = (event) => {
        this.setState({selectedNewStatusOption: event.target.value})
    }
    changeSelectNewNotesOptionHandler = (event) => {
        this.setState({selectedNewNotesOption: event.target.value})
    }
    handleDropdownChangeNewNotes = (X) => {
        if (X === this.state.selectedNewStatusOption) {
            if (X === 'PTP') {
                return this.state.allNotes[0].map(value => {return <option value={value}>{value}</option>})
            } else if (X === 'CB') {
                return this.state.allNotes[1].map(value => {return <option value={value}>{value}</option>})
            } else if (X === 'RJCT') {
                return this.state.allNotes[2].map(value => {return <option value={value}>{value}</option>})
            } else if (X === 'NA') {
                return this.state.allNotes[3].map(value => {return <option value={value}>{value}</option>})
            } else {
                return <option value=" ">none</option>
            }
        } else {
            return;
        }
    }
    handleChangeDate(date) {
        this.setState({
            paymentDatePicker: date
        })
    }
    handleChangeNewDate(date) {
        this.setState({
            newPaymentDatePicker: date
        })
    }

    handleEdit = async(e) => {
        e.preventDefault();
        let updateQuery = document.getElementById('id').value;
        let query_phone1 = document.getElementById('phone1').value; 
        let query_phone2 = document.getElementById('phone2').value; 
        let query_phone3 = document.getElementById('phone3').value; 
        let query_phone4 = document.getElementById('phone4').value;
        let query_phone5 = document.getElementById('phone5').value;
        let query_phone6 = document.getElementById('phone6').value;
        let query_phone7 = document.getElementById('phone7').value;
        let query_phone8 = document.getElementById('phone8').value;
        let query_status = document.getElementById('status').value;  
        let query_notes = document.getElementById('notes').value; 
        let query_paymentDate = document.getElementById('paymentDate').value;
        let query_newStatus = document.getElementById('newStatus').value;
        let query_newPaymentDate = document.getElementById('newPaymentDate').value;
        let query_newNotes = document.getElementById('newNotes').value;
        let query_customerStatus = document.getElementById('customerStatus').value;
        
        let quesry = {
            "id": updateQuery,
            "contents": { 
                "phone1": query_phone1,
                "phone2": query_phone2,
                "phone3": query_phone3,
                "phone4": query_phone4,
                "phone5": query_phone5,
                "phone6": query_phone6,
                "phone7": query_phone7,
                "phone8": query_phone8,
                "status": query_status,
                "notes":  query_notes,
                "paymentDate":  query_paymentDate,
                "newStatus":  query_newStatus,
                "newNotes":  query_newNotes,
                "newPaymentDate":  query_newPaymentDate,
                "customerStatus": query_customerStatus
            }
        }
        let targetLink = `${APP_CONSTANTS.CONFIG.APIs.CMS.MODIFY_CUSTOMER}`;
        await axios.put(targetLink, quesry, config).then((response) => {
            sessionStorage.removeItem(APP_CONSTANTS.CONFIG.sessionStorage.targetedCustomerId);
            window.location.href = "/employeeDashboard"
          }).catch(error => console.log(error));
    }
    render() {
        return (
            <div className="customer-wrapper">
                <form className="customer-form">
                    <div className="row" >
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-customerName")}</p>
                            <input className="col-md-6" type="text" id="customerName" name="customerName" readOnly/>
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-nationalID")}</p>
                            <input className="col-md-6" type="text" id="nationalID" name="nationalID" readOnly/>
                        </div>
                        <div className="col-md-4 customer-form-content ">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-id")}</p>
                            <input className="col-md-6" type="text" id="id"  name="id" readOnly />
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-costAfterDiscount")}</p>
                            <input className="col-md-6" type="text" id="costAfterDiscount" name="costAfterDiscount" readOnly/>
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-discount")}</p>
                            <input className="col-md-6" type="text" id="discount" name="discount" readOnly/>
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-cost")}</p>
                            <input className="col-md-6" type="text" id="cost" name="cost" readOnly/>
                        </div>
                    </div>
                    <hr />
                    <div className="row" >
                        <div className="col-md-4 customer-form-content ">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-firstBillDate")}</p>
                            <input className="col-md-6" type="text" id="firstBillDate" name="firstBillDate" readOnly />
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-lastBillDate")}</p>
                            <input className="col-md-6" type="text" id="lastBillDate" name="lastBillDate" readOnly/>
                        </div>
                    </div>
                    <hr />
                    <div className="row" >
                        <div className="col-md-4 customer-form-content ">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-phone1")}</p>
                            <input className="col-md-6" type="text" id="phone1" name="phone1"  />
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-phone2")}</p>
                            <input className="col-md-6" type="text" id="phone2" name="phone2" />
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-phone3")}</p>
                            <input className="col-md-6" type="text" id="phone3" name="phone3" />
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-4 customer-form-content ">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-phone4")}</p>
                            <input className="col-md-6" type="text" id="phone4" name="phone4"  />
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-phone5")}</p>
                            <input className="col-md-6" type="text" id="phone5" name="phone5" />
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-phone6")}</p>
                            <input className="col-md-6" type="text" id="phone6" name="phone6" />
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-4 customer-form-content ">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-phone7")}</p>
                            <input className="col-md-6" type="text" id="phone7" name="phone7"  />
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-phone8")}</p>
                            <input className="col-md-6" type="text" id="phone8" name="phone8" />
                        </div>
                    </div>
                    <hr />
                    <div className="row" >
                        <div className="col-md-4 customer-form-content ">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-collecterUsername")}</p>
                            <input className="col-md-6" type="text" id="collecterUsername" name="collecterUsername" readOnly />
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-attributionDate")}</p>
                            <input className="col-md-6" type="text" id="attributionDate" name="attributionDate" readOnly/>
                        </div>
                    </div>
                    <hr />
                    <div className="row" >
                        <div className="col-md-4 customer-form-content ">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-status")}</p>
                            <select id="status" className="col-md-6 custom-select" onChange={this.changeSelectStatusOptionHandler}>
                                {this.state.statusOptions.map( (option) =>
                                    <option value={option}>{option}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-notes")}</p>
                            <select id="notes" className="col-md-6 custom-select" onChange={this.changeSelectNotesOptionHandler}>
                                { 
                                    this.state.statusOptions.map(this.handleDropdownChangeNotes)
                                }
                            </select>
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-paymentDate")}</p>
                            <DatePicker id="paymentDate" className="col-md-8 datePicker"
                                selected= { this.state.paymentDatePicker}
                                onChange= { this.handleChangeDate }
                                name="paymentDate"
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="row" >
                        <div className="col-md-4 customer-form-content ">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-newStatus")}</p>
                            <select id="newStatus" className="col-md-6 custom-select" onChange={this.changeSelectNewStatusOptionHandler}>
                                {this.state.statusOptions.map( (option) =>
                                    <option value={option}>{option}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-newNotes")}</p>
                            <select id="newNotes" className="col-md-6 custom-select" onChange={this.changeSelectNewNotesOptionHandler}>
                                { 
                                    this.state.statusOptions.map(this.handleDropdownChangeNewNotes)
                                }
                            </select>
                        </div>
                        <div className="col-md-4 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-newPaymentDate")}</p>
                            <DatePicker id="newPaymentDate" className="col-md-8 datePicker"
                                selected= { this.state.newPaymentDatePicker}
                                onChange= { this.handleChangeNewDate }
                                name="newPaymentDate"
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-5 customer-form-content">
                            <p className="col-md-4">{i18n.t("customerDetails.form-header-customerStatus")}</p>
                            <select id="customerStatus" className="col-md-6 custom-select" onChange={this.changeSelectcustomerStatusHandler}>
                                <option value="new">{i18n.t("customerDetails.form-header-option1")}</option>
                                <option value="in progress">{i18n.t("customerDetails.form-header-option2")}</option>
                                <option value="done">{i18n.t("customerDetails.form-header-option3")}</option>
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div className="row justify-content-md-center" >
                        <input className="col-md-2 btn btn-primary" value={i18n.t("customerDetails.form-header-button")} type="submit" onClick={this.handleEdit}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default CustomerDetails;