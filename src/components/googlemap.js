import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Map extends React.Component{

    componentDidMount(){
        this.loadMap();
        this.forceUpdate();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.google !== this.props.google){
            console.log('updating props');
            this.loadMap();
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
            const {lat, lng} = initialCenter;
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
    initialCenter: React.PropTypes.object
}

Map.defaultProps = {
    zoom: 13,
    // San Francisco, by default
    initialCenter: {
        lat: 33.6846,
        lng: -117.8265,
    }
}

export default Map;
