import React, {Component} from 'react';
import './item-list.css'
import Spinner from "../spinner";

class ItemList extends Component {

    state = {
        itemList: null
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
        const {getData} = this.props;
        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    render() {
        const {itemList} = this.state;
        if (!itemList) {
            return <Spinner/>
        }
        const items = this.renderItems(itemList)

        return (
            <ul className='item-list list-group'>
                {items}
            </ul>
        );
    }
}

export default ItemList;