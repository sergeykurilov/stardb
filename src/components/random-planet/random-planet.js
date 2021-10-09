import React, {Component} from 'react';
import './random-planet.css'
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    }

    constructor() {
        super();
        this.updatePlanet()
    }

    onPlanetLoaded = (planet) => {
        this.setState({planet, loading: false})
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updatePlanet() {
        // const id = Math.floor(Math.random() * 25 + 2);
        const id = 15;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    }

    render() {
        const {planet, loading, error} = this.state;
        const hasData = !(loading || error)
        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <PlanetView planet={planet}/> : null;
        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const PlanetView = ({planet}) => {
    const {population, rotationPeriod, diameter, name, id} = planet;
    return (
        <>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default RandomPlanet;