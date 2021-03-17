import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import i18n from '../../core/i18n';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
             t: props.t,
             NavDir: "mr-auto",
        }
    }
    changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        if (lng === "en") {
            document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
            this.state.NavDir = "mr-auto";
        } else {
            document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
            this.state.NavDir = "ml-auto";
        }
    }
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a class="navbar-brand">{this.state.t('Header.Header-Nav-Logo')}</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarColor02">
                        <ul class={`navbar-nav ${this.state.NavDir}`}>
                            <li class="nav-item active">
                                <Link to="/EmployeeDashboard" style={{ textDecoration: 'none' }}>
                                    <a class="nav-link" href="/EmployeeDashboard">{this.state.t('Header.Header-Nav-Dashboard-Button')}
                                    <span class="sr-only">(current)</span>
                                    </a>
                                </Link> 
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{this.state.t('Header.Header-Nav-Language-Button')}</a>
                                <div class="dropdown-menu">
                                    <button class="dropdown-item" onClick={() => this.changeLanguage('ar')}>عربي</button>
                                    <button class="dropdown-item" onClick={() => this.changeLanguage('en')}>English</button>
                                </div>
                            </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                            <Link to="/Login" style={{ textDecoration: 'none' }}>
                                <button class="btn btn-secondary my-2 my-sm-0" type="submit">{this.state.t('Header.Header-Nav-Login-Button')}</button>
                            </Link>
                            <Link to="/Logout" style={{ textDecoration: 'none' }}>
                                <button class="btn btn-secondary my-2 my-sm-0" type="submit">{this.state.t('Header.Header-Nav-Logout-Button')}</button>
                            </Link>
                        </form>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;