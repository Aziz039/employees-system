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
                    <div class="row">
                        <div class="col-lg-12">
                            <p>Made by <a href="https://www.linkedin.com/in/abdulazizali/">Abdulaziz Alghamdi</a></p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;