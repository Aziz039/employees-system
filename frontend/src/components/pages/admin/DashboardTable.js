import React, { Component } from 'react';

import i18n from '../../../core/i18n';
import APP_CONSTANTS, {config} from "../../../core/app_constants";

class DashboardTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
             
        }
    }
    
    componentDidMount () {
        
    }

    render() {
        return (
            <div className="adminDashView">
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
                </form>
            </div>
        );
    }
}

export default DashboardTable;