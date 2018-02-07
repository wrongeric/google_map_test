import React, {Component} from 'react';
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

    loadMap(){
        if(this.props && this.props.google){
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let zoom =14;
            let lat = 33.6846;
            let lng = -117.8265;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            })
            this.map = new maps.Map(node, mapConfig);
            console.log(this.map);
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

export default Map;
