import { Component } from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {
  state = {
    viewport: {
      width: '92vw',
      height: '76vh',
      latitude: 20.593684,
      longitude: 78.96288, 
      zoom: 4,
      scrollZoom: false,
      boxZoom         : false,
      doubleClickZoom : false
    }
  };

  render() {
    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken="pk.eyJ1Ijoibm9vYmFra2kwOSIsImEiOiJja3cyaGQ1ZnYwZmVnMnBwNm1nYzFnZmVrIn0.tlP6nr4aqbDf2GsJEhEmYA"
        onViewportChange={(viewport) => this.setState({ viewport })}
        {...this.state.viewport}
      />
    );
  }
}

export default Map;