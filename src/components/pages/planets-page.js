import React, {Component} from 'react';
import Row from "../row";
import {PersonDetails, PersonList} from "../sw-components";

class PlanetsPage extends Component {

    state = {
        selectedItem: null,
    }

    onItemSelected = (selectedItem) => {
        this.setState({selectedItem})
    }

    render() {
        const {selectedItem} = this.state
        return (
            <Row left={<PersonList onItemSelected={this.onItemSelected}/>}
                 right={<PersonDetails itemId={selectedItem}/>}
            />
        );
    }
}

export default PlanetsPage;
