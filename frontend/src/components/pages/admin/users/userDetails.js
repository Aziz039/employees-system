import React, { Component } from 'react';

import i18n from '../../../../core/i18n';
import APP_CONSTANTS, {config} from "../../../../core/app_constants";
import axios from 'axios';

class userDetails extends Component {
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
    }
    getData = async () => {
        let targetLink = `${APP_CONSTANTS.CONFIG.APIs.ADMIN.USERS.GET_A_USER}`;
        // await axios.get(targetLink, config).then(
        //   (res) => {
        //       if (res.data.body) {
        //         res.data.body.forEach((item, i) => {
        //             item.id = i + 1;
        //         });
        //         this.setState({
        //             ...this.state, // spreading in state for future proofing
        //             isLoaded: true,
        //             data: res.data
        //         })
        //       }
        //     }
        // ).catch(error => {console.log(error);});
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export 
default userDetails;