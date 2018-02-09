import React, {Component} from 'react';

export class Marker extends Component {
    constructor(props){
        super(props)
    }
    //maybe this is ComponentDidMount  - not sure if it is - suggested changes is forceUpdate at end of loadMap function
    ComponentWillMount(prevProps) {
        //Will only update when the position or the map props have changed - necessary to re-render Markers on Map
        if ((this.props.map !== prevProps.map) ||
            (this.props.position !== prevProps.position)) {
            // The relevant props have changed
        }
    }
    renderMarker() {
        let {
            map, google, position, mapCenter
        } = this.props;

        let pos = position || mapCenter;
        position = new google.maps.LatLng(pos.lat, pos.lng);

        const pref = {
            map: map,
            position: position
        };
        this.marker = new google.maps.Marker(pref);
    }

    render() {
        return null;
    }
}

Marker.propTypes = {
    position: React.PropTypes.object,
    map: React.PropTypes.object,
}