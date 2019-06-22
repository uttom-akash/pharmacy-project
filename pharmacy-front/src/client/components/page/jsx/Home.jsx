import React, { Component } from 'react';
import Card from '../../unitComp/Card/Card'
import '../css/Home.css'
import Ask from './Ask'
import Searchbar from '../../unitComp/search/Searchbar'


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: 24,
            lng: 91,
            query:""
        }

        this.geoOptions = {
            maximumAge: 5 * 60 * 1000,
            timeout: 10 * 1000,
            enableHighAccuracy: true
        }
    }


    onChange = (ev) => this.setState({ query: ev.target.value });
    onSetSate = (nstat) => this.setState(nstat);




    locateMyPlace = () => {

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({ lat: position.coords.latitude, lng: position.coords.longitude })
                resolve();
            }, () => {
                reject();
            }, this.geoOptions);
        })
    }


    // geoSuccess = (position) => {
    //     this.setState({ lat: position.coords.latitude, lng: position.coords.longitude })
    // }

    // geoError = (error) => {
    //     console.log('Error occurred. Error code: ' + error.code);
    //     // error.code can be:
    //     //   0: unknown error
    //     //   1: permission denied
    //     //   2: position unavailable (error response from location provider)
    //     //   3: timed out
    // };





    createMarker = (place, map, infowindow) => {

        let marker = new window.google.maps.Marker({
            map: map,
            position: place.geometry.location
        });


        window.google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });

    }


    findPlace = (map) => {
        let infowindow = new window.google.maps.InfoWindow();

        var request = {
            query: 'Blue Bird School and College',
            fields: ['name', 'geometry'],
        };

        let service = new window.google.maps.places.PlacesService(map);


        service.findPlaceFromQuery(request, function (results, status) {
            console.log("akash");

            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    this.createMarker(results[i], map, infowindow);
                }

                map.setCenter(results[0].geometry.location);
            }
        });
    }

    onShowMap = () => {
        const { lat, lng } = this.state;
        let place = { lat: lat, lng: lng };
        let map = new window.google.maps.Map(
            document.getElementById('map'), { zoom: 4, center: place });
        let marker = new window.google.maps.Marker({ position: place, map: map });
        return map;
    }




    onFindPharmacy = () => {
        this.locateMyPlace().then(() => {
            let map = this.onShowMap();
            this.findPlace(map);
        })
    }

    onFindMe = () => {
        this.locateMyPlace().then(() => this.onShowMap()
        );
    }

    onRoute = (path) => this.props.history.push(path)

    render() {
        return (
            <div className="home">
                <Ask/>                
                <Searchbar query={this.state.query} onChange={this.onChange} id="search"/>
                <div className="home-card">
                    {/* <Card onClick={() => this.onRoute('/order')} icon="fas fa-gift" title="My Orders" description="Get your medicine at home" /> 
                    <Card onClick={() => this.onRoute('/cart')} icon="fa fa-shopping-cart" title="Cart" description="Get your medicine at home" /> */}
                    <Card onClick={() => this.onRoute('/catagories')} icon="fa fa-shopping-cart" title="Catagories" description="Browse by catagories" />
                    <Card onClick={() => this.onRoute('/brands')} icon="fas fa-briefcase-medical" title="Brands" description="Browse by brands" />
                    <Card onClick={() => this.onRoute('/filterSearch')} icon="fa fa-search-plus" title="Filter Search" description="Search medicine with extensive filter" />


                    <Card onClick={this.onFindPharmacy} icon="fas fa-medkit" title="Nearest Pharmacy" description="Find your nearest pharmacy" />
                    <Card onClick={this.onFindMe} icon="fas fa-map-marker-alt" title="Location" description="Find your location" />

                </div>
                <div className="map-container">
                    <div id="map"></div>
                </div>
            </div>
        );
    }
}

export default Home;