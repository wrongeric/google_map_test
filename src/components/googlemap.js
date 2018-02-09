import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Camelize} from './utils/helper';


class Map extends React.Component{
    constructor(props) {
        super(props);

        const {lat, lng} = this.props.initialCenter;
        this.evtNames = ['click', 'dragend', 'ready'];
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

            //This would be a clunky way of making an event for each event handler, instead of copy and pasting each time
            //we can make a list of events we want to handle and then map through that list to addListeners to each handler.
            // let centerChangedTimeout;
            // this.map.addListener('dragend', (evt) => {
            //     if (centerChangedTimeout) {
            //         clearTimeout(centerChangedTimeout);
            //         centerChangedTimeout = null;
            //     }
            //     centerChangedTimeout = setTimeout(() => {
            //         this.props.onMove(this.map);
            //     }, 0);
            // })

            this.map = new maps.Map(node, mapConfig);

            //for each event name, we want to add add event listeners to handle each event.
            this.evtNames.forEach(e => {
                this.map.addListener(e, this.handleEvent(e));
            });

            maps.event.trigger(this.map, 'ready');

            // this.forceUpdate();
            // this.map.addListener('dragend', (evt) => {
            //     this.props.onMove(this.map);
            // })
        }
    }



    handleEvent(evtName) {
        let timeout;

        //putting this here to let me know where I left off, Map.proptypes is found at bottom - where to put this forEach function?
        // this.evtNames.forEach(e => Map.propTypes[Camelize(e)] = PropTypes.func);
        //changes our callbacks to better reflect React naming schemes: ex: onClick - not sure where this should be
        const handlerName = `on${Camelize(evtName)}`;

        return (e) => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            timeout = setTimeout(() => {
                if (this.props[handlerName]) {
                    this.props[handlerName](this.props, this.map, e);
                }
            }, 0);
        }
    }
    renderChildren(){
        const {children} = this.props;

        //if map is used without children elements, the renderChildren method won't blow up the rest of application
        if (!children) return;

        //Clones each of the children passed by a component
        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        })
    }
    render(){
        const style = {
            width: '100vw',
            height: '60vh'
        };
        return (
            <div style={style} ref="map">
                Loading map...
                {this.renderChildren()}
            </div>
        );
    }
}


Map.propTypes = {
    google: React.PropTypes.object,
    zoom: React.PropTypes.number,
    initialCenter: React.PropTypes.object,
    //maybe optional to center around current location for final project
    centerAroundCurrentLocation: React.PropTypes.bool,
    onMove: React.PropTypes.func,
}

Map.defaultProps = {
    zoom: 13,
    // Irvine by Default
    initialCenter: {
        lat: 33.6846,
        lng: -117.8265,
    },
    centerAroundCurrentLocation: false,
    onMove: function() {} // default prop
}

export default Map;
