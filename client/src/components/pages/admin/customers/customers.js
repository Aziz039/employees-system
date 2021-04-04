import React, { Component } from 'react';

// import "../../../../assets/styles/admin"

import i18n from '../../../../core/i18n';
import APP_CONSTANTS, {config} from "../../../../core/app_constants";

class customers extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isLogged: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.isLogged),
            Language: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.LANGUAGE),
            usename: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.USER),
            role: sessionStorage.getItem(APP_CONSTANTS.CONFIG.sessionStorage.ROLE)
        }
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default customers;