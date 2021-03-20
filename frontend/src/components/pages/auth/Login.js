import React, { Component } from 'react';
import axios from 'axios';
import LoginAvatar from "../../../assets/images/logo.png";
import  "../../../assets/styles/login.css";
import i18n from "i18next";
import Footer from '../../shared/Footer.js';

import APP_CONSTANTS from "../../../core/app_constants";


class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formControls: {

            }
        }
        console.log("const Dash ", sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE));
    }
    handleChange = async (e) => {
        await this.setState({
            ...this.state,
            formControls: {
                ...this.state.formControls,
                [e.target.name]: e.target.value
            }
        });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        if (!this.state.formControls.username || !this.state.formControls.password) {
            let alerttt = `${i18n.t("LoginPage.Login-missing-message")} \n`;
            if (!this.state.formControls.username ) {
                alerttt += `${i18n.t("LoginPage.Login-missing-username")} \n`;
            } if (!this.state.formControls.password) {
                alerttt += `${i18n.t("LoginPage.Login-missing-password")} \n`;
            }
            alert(alerttt);
        }  else {
            e.preventDefault();
            let content = this.state.formControls;
            await axios.post(APP_CONSTANTS.CONFIG.APIs.AUTH.LOGIN, {content}).then(async res => {
                if (res) {
                    sessionStorage.setItem(APP_CONSTANTS.CONFIG.sessionStorage.USER, res.data.body.username);
                    sessionStorage.setItem(APP_CONSTANTS.CONFIG.sessionStorage.TOKEN, res.data.body.token);
                    sessionStorage.setItem(APP_CONSTANTS.CONFIG.sessionStorage.isLogged, true);
                    window.location.href = "/EmployeeDashboard";
                } 
            }).catch(error => {alert("Wrong credentials!");});
        }
    }
    render() {
        return (
            <div>
            <div className="wrapperr fadeInDown">
                <div id="formContentr">
                    <div className="fadeIn first">
                        <img src={LoginAvatar} id="iconn" alt="User Icon" />
                    </div>
                    <form>
                        <input placeholder={i18n.t("LoginPage.Login-Card-Username")} id="username" type="text" className="fadeIn second" name="username" onChange={this.handleChange}/>                
                        <input placeholder={i18n.t("LoginPage.Login-Card-Password")} id="password" type="password" className="fadeIn third" name="password" onChange={this.handleChange}/>
                        <input  value={i18n.t("LoginPage.Login-Card-Header")} type="submit" className="fadeIn fourth " onClick={this.handleSubmit} />
                    </form>
                </div>
            </div>
            <Footer/>
            </div>
        );
    }
}


export default login;