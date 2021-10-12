import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorIndicator from "../error-indicator";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import {Record} from "../item-details/item-details";

export default class App extends Component {

    swapiService = new SwapiService()

    state = {
        showRandomPlanet: true,
        hasError: false,
        selectedPerson: 3,
    };

    componentDidCatch(error, errorInfo) {
        console.log('componentDidCatch')
        this.setState({
            hasError: true
        })
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }
        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;
        const {
            getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
        } = this.swapiService;

        const personDetails = (
            <ItemDetails
                getData={getPerson}
                itemId={11}
                getImageUrl={getPersonImage}
            >
                <Record field='gender' label='Gender'/>
                <Record field='eyeColor' label='Eye Color'/>
            </ItemDetails>
        );
        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipImage}
            />
        )

        return (
            <div className="stardb-app">
                <Header/>
                <Row left={personDetails} right={starshipDetails}/>
            </div>
        );
    }
}
