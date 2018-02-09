import React from 'react';
import {render} from 'react-dom';
import GoogleApiComponent from './GoogleApiComponent';
import Map from './googlemap';
import {Marker} from './marker';

class Container extends React.Component{

    render(){
        const pos = {lat: 37.759703, lng: -122.428093}
        // const pos = {lat: 37.759703, lng: -117.8265}
        return (
            <div>
                <Map google={this.props.google}>
                    <Marker />
                    <Marker position ={pos} />
                </Map>
            </div>
        );
    }
}

export default GoogleApiComponent({
    apiKey: 'AIzaSyAl82-QVgSS43dlCQqr6flx8BaCbREVOTA'
})(Container);
