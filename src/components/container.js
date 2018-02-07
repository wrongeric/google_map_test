import React from 'react';
import {render} from 'react-dom';
import GoogleApiComponent from './GoogleApiComponent';
import Map from './googlemap';

class Container extends React.Component{

    render(){


        return (
            <div>
                <Map google={this.props.google}/>
            </div>
        );
    }
}

export default GoogleApiComponent({
    apiKey: 'AIzaSyAl82-QVgSS43dlCQqr6flx8BaCbREVOTA'
})(Container);
