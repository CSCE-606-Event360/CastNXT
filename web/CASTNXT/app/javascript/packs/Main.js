import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Homepage from '../components/Home/Homepage';
import UserHomepage from '../components/User/UserHomepage';
import UserEventRegister from '../components/User/UserEventRegister';
import AdminHomepage from '../components/Admin/AdminHomepage';
import AdminCreateEvent from '../components/Admin/AdminCreateEvent';
import AdminCreateStack from '../components/Admin/AdminCreateStack';
import AdminCreateClientStack from '../components/Admin/AdminCreateClientStack';
import AdminEventPage from '../components/Admin/AdminEventPage';
import ClientHomepage from '../components/Client/ClientHomepage';
import ClientEventPage from '../components/Client/ClientEventPage';

class Main extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            
        }
    }
    
    render() {
        return (
        <div className="App">
          <div className="overflow-auto" style={{ "paddingTop": "1%" }}>
            <Router>
              <Switch>
                <Route exact path="/user/events/*" render= {() => <UserEventRegister />} />
                <Route exact path="/user" render= {() => <UserHomepage />} />
                <Route exact path="/admin/events/new" render= {() => <AdminCreateEvent />} />
                <Route exact path="/admin/events/*" render= {() => <AdminEventPage />} />
                <Route exact path="/admin" render= {() => <AdminHomepage />} />
                <Route exact path="/client/events/*" render= {() => <ClientEventPage />} />
                <Route exact path="/client" render= {() => <ClientHomepage />} />
                <Route exact path="/" render= {() => <Homepage />} />
              </Switch>
            </Router>
          </div>
        </div>
      );
    }
}

export default Main;
