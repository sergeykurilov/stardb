import React, {Component} from 'react';
import './item-list.css'
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

class ItemList extends Component {

    swapiService = new SwapiService()

    state = {
        peopleList: null
    }

    renderItems(arr) {
        return arr.map(({name, id}) => (
            <li
                className='list-group-item'
                key={id}
                onClick={() => this.props.onItemSelected(id)}
            >
                {name}
            </li>
        ))
    }

    componentDidMount() {
        this.swapiService
            .getAllPeople()
            .then((peopleList) => {
                this.setState({
                    peopleList
                })
            })
    }

    render() {
        const {peopleList} = this.state;
        if (!peopleList) {
            return <Spinner/>
        }
        const items = this.renderItems(peopleList)

        return (
            <ul className='item-list list-group'>
                {items}
            </ul>
        );
    }
}

export default ItemList;