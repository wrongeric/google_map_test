import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Map extends React.Component{
    constructor(props) {
        super(props);

        const {lat, lng} = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        }
    }
    componentDidMount(){
        //Centers map based on geolocation of the browsers navigator functionality
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    })
                })
            }
        }
        this.loadMap();
        this.forceUpdate();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }
    //Will only be called when the currentLocation in the component's state is updated.
    recenterMap() {
        const map = this.map;
        const curr = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng)
            map.panTo(center)
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            // google is available

            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let {initialCenter, zoom} = this.props;
            const {lat, lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            })
            this.map = new maps.Map(node, mapConfig);
        }
    }



    render(){
        const style = {
            width: '100vw',
            height: '60vh'
        };
        return (
            <div style={style} ref="map">map will come here</div>
        );
    }
}

Map.propTypes = {
    google: React.PropTypes.object,
    zoom: React.PropTypes.number,
    initialCenter: React.PropTypes.object,
    //maybe optional to center around current location for final project
    centerAroundCurrentLocation: React.PropTypes.bool
}

Map.defaultProps = {
    zoom: 13,
    // Irvine by Default
    initialCenter: {
        lat: 33.6846,
        lng: -117.8265,
    },
    centerAroundCurrentLocation: false,
}

export default Map;
