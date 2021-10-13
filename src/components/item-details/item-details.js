import React, {Component} from 'react';
import Spinner from "../spinner";
import './item-details.css';
import SwapiService from "../../services/swapi-service";
import ErrorIndicator from "../error-indicator";
import ErrorButton from "../error-button";


export const Record = ({item, field, label}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

class ItemDetails extends Component {

    swapiService = new SwapiService()

    state = {
        item: null,
        loading: true,
        image: null,
    }

    componentDidMount() {
        this.updatePerson()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.updatePerson()
        }
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    updatePerson() {
        const {itemId, getData, getImageUrl} = this.props
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false,
                    error: false,
                    image: getImageUrl(item)
                })
            })
            .catch(this.onError)
    }

    render() {
        const {item, image, loading, error} = this.state;
        if (!item) {
            return <span>Select a item from a list</span>
        }
        const hasData = !(loading || error)
        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <ItemView children={this.props.children} image={image} item={item}/> : null;
        return (
            <div className="person-details card">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const ItemView = ({item, image, children}) => {
    const {
        name
    } = item;
    return (
        <>
            <img className="person-image"
                 src={image}
                 alt="character"/>

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {React.Children.map(children, (child, idx) => {
                        return React.cloneElement(child, {item})
                    })}
                </ul>
                <ErrorButton/>
            </div>
        </>
    )
}

export default ItemDetails
