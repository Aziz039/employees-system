import React, { Component } from 'react';
import axios from 'axios'
import core from "../../core/app_constants"
import LoginAvatar from "../../assets/images/logo.png"
import "../../assets/styles/login.css"
import i18n from "i18next"
import Footer from '../shared/Footer.js';
class login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            formControls: {

            }
        }
    }
    handleChange = async (e) => {
        await this.setState({
            ...this.state,
            formControls: {
                ...this.state.formControls,
                [e.target.name]: e.target.value
            }
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        let username = this.state.formControls.username;
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
            // await axios.post(core.APIs.auth.login, this.state.formControls).then(res => {
            //     if (res) {
            //         console.log(res);
            //         localStorage.setItem(core.config.localStorage.token, res.data.token);
            //         localStorage.setItem(core.config.localStorage.username, username);
            //         window.location.href = "/EmployeeDashboard";
            //     } 
            // }).catch(error => {alert("Wrong credentials!");});
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