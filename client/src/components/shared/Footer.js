import React, { Component } from 'react';
import "../../assets/styles/footer.css";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <footer id="footer">
                    <div className="row">
                        <div className="col-lg-12">
                            <p>Made by <a href="https://aziz039.github.io/">Abdulaziz Alghamdi</a></p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;