import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorBoundry from "../error-boundry";
import {SwapiServiceProvider} from "../swapi-service-context";
import DummySwapiService from "../../services/dummy-swapi-service";
import SwapiService from "../../services/swapi-service";
import {LoginPage, PeoplePage, PlanetsPage, SecretPage, StarshipsPage} from "../pages";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {StarshipDetails} from "../sw-components";


export default class App extends Component {


    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    }

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService
                ? SwapiService : DummySwapiService
            return {
                swapiService: new Service()
            }
        });
    }

////
    render() {
        const {isLoggedIn} = this.state;
        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}/>
                            <RandomPlanet/>
                            <Switch>
                                <Route exact path='/' render={() => <h2>Welcome to StarDB</h2>}/>
                                <Route exact path="/people" component={PlanetsPage}/>
                                <Route exact path="/people/:id?" component={PlanetsPage}/>
                                <Route exact path="/planets" component={PeoplePage}/>
                                <Route exact path="/starships" component={StarshipsPage}/>
                                <Route exact path="/starships/:id"
                                       render={({match, location, history}) => {
                                           const {id} = match.params
                                           return <StarshipDetails itemId={id}/>
                                       }}
                                />
                                <Route exact path="/login" render={() => (
                                    <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin}/>
                                )}/>
                                <Route exact path="/secret" render={() => (
                                    <SecretPage isLoggedIn={isLoggedIn}/>
                                )}/>
                                <Route render={() => <h2>Page not found!</h2>}/>
                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        )
    }
}
