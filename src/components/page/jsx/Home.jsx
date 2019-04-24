import React, { Component } from 'react';
// import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

import Card from '../../unitComp/Card/Card'
import '../css/Home.css'


class Home extends Component {
    state = {}
    render() {
        return (
            <div className="home">
                <Card className="card" icon="fa fa-shopping-cart" title="Home Delivary" description="select medicine" />
            </div>
        );
    }
}

export default Home;