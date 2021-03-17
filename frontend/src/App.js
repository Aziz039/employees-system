import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { withNamespaces } from 'react-i18next';

import Header from './components/shared/Header.js';
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import CustomerDetails from "./components/pages/CustomerDetails";

function App({ t }) {
  return (
    <div className="App">
      <Router>
        <Header t={ t }/>
        <Switch>
          <Route exact path="/" render={ () => {
              window.location.href = "/Login";
            }
          } />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/EmployeeDashboard" component={Dashboard} />
          <Route exact path="/CustomerDetails" component={CustomerDetails} />
          <Redirect from="*" to={"/"} />
        </Switch>
      </Router>
    </div>
  );
}

export default withNamespaces()(App);
