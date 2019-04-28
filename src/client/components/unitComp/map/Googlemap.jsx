import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './gmap.css'

export class MapContainer extends Component {
    render() {
        return (
            <div id="map" className="map">
                <Map
                    google={this.props.google}
                    zoom={14}
                    initialCenter={{
                        lat: -1.2884,
                        lng: 36.8233
                    }}
                />
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDz5WWZwzA2LKFYR6JMUqtvlZqeI4MqF3A'
})(MapContainer);