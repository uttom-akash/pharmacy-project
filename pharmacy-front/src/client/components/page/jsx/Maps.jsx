import React, { Component } from 'react'
import Geocode from "react-geocode";
import {Icon} from 'semantic-ui-react'

Geocode.setApiKey("AIzaSyBk2JhnmxoEkc6lWEAW8pI6C_2BChFHmBY")
Geocode.enableDebug()

const geoOptions = {
    maximumAge: 5 * 60 * 1000,
    timeout: 10 * 1000,
    enableHighAccuracy: true
}

class Maps extends Component {

    state={
        lat:'',
        lng:'',
        address:''
    }
    


    getAddress=({lat,lng})=>{    
        
        this.setState({lat,lng})

        
        Geocode.fromLatLng(lat,lng).then(
            response => {
              this.setState({address:response.results[0].formatted_address})
            },
            error => {
              console.error(error);
            }
          );
    }

    

    findUserLocation=()=>{
            navigator.geolocation.getCurrentPosition(position=>this.getAddress({lat:position.coords.latitude,lng:position.coords.longitude}),
                                                     ()=>{},
                                                     geoOptions
                                                    )
    }

    render() {
        return (
            <div onClick={this.findUserLocation}>
               <Icon name='location arrow'/> 
            </div>
        )
    }
}


export default Maps;