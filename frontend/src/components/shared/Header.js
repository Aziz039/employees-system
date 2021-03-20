import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import i18n from '../../core/i18n';
import APP_CONSTANTS from '../../core/app_constants';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
             t: props.t,
             NavDir: "",
             isLogged: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.isLogged),
             Language: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE)
        }
        this.changeLanguage = this.changeLanguage.bind(this);
    }
    componentDidMount() {
        let lngTmp;
        if (!sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE)) {
            if (!this.state.Language) {
                sessionStorage.setItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE, "en");
                this.setState( {Language: "en"});
                lngTmp = "en";
            } else {
                sessionStorage.setItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE, this.state.Language);
            }
        }
        if (this.state.Language === "en" || lngTmp === "en") {
            document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
            this.setState({NavDir: "mr-auto"});
        } else if (this.state.Language === "ar") {
            document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
            this.setState({NavDir: "ml-auto"});
        }
        i18n.changeLanguage(this.state.Language);
    }
    changeLanguage = async (event) => {
        await this.setState({
            Language: event.target.id
        })
        if (this.state.Language === "en") {
            document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
            this.setState({NavDir: "mr-auto"});
            sessionStorage.setItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE, this.state.Language);
        } else {
            document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
            this.setState({NavDir: "ml-auto"});
            sessionStorage.setItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE, this.state.Language);
        }
        i18n.changeLanguage(sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE));
        window.location.reload(false);
    }
    logout = () => {
        sessionStorage.removeItem(APP_CONSTANTS.CONFIG.sessionStorage.TOKEN);
        sessionStorage.removeItem(APP_CONSTANTS.CONFIG.sessionStorage.USER);
        sessionStorage.removeItem(APP_CONSTANTS.CONFIG.sessionStorage.isLogged);
        window.location.href = "/Login";
      }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <Link to="#"  className="navbar-brand">{this.state.t('Header.Header-Nav-Logo')}</Link >
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className={`navbar-nav ${this.state.NavDir}`}>
                            <li className="nav-item ">
                                <Link style={{ textDecoration: 'none' }} className="nav-link" to="/EmployeeDashboard">{this.state.t('Header.Header-Nav-Dashboard-Button')}
                                <span className="sr-only">(current)</span>
                                </Link >
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">{this.state.t('Header.Header-Nav-Language-Button')}</Link>
                                <div className="dropdown-menu">
                                    <button className="dropdown-item" id="en" onClick={this.changeLanguage}>English</button>
                                    <button className="dropdown-item" id="ar" onClick={this.changeLanguage}>عربي</button>
                                </div>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            {
                                this.state.isLogged?
                                    <button className="btn btn-secondary my-2 my-sm-0" type="submit"  onClick={this.logout} >{this.state.t('Header.Header-Nav-Logout-Button')}</button>
                                        :
                                    <Link to="/Login" style={{ textDecoration: 'none' }}>
                                        <button className="btn btn-secondary my-2 my-sm-0" type="submit">{this.state.t('Header.Header-Nav-Login-Button')}</button>
                                    </Link>
                            }
                        </form>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;