import React, { useState } from 'react';
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';
import { setRTLTextPlugin } from 'mapbox-gl';
import { LocationOnOutlined } from '@material-ui/icons';

setRTLTextPlugin(
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
  (err: Error) => {
    console.log(err);
  },
  true,
);

function Map(): JSX.Element {
  const [viewport, setViewport] = useState({
    width: '90%',
    height: 400,
    latitude: 35.7505,
    longitude: 50.9264,
    zoom: 13,
  });
  return (
    <ReactMapGL
      mapboxApiAccessToken="pk.eyJ1IjoiYXJhc2hmaXJvb3phYmFkaSIsImEiOiJjam1kOG5jbnEydDdmM2twb3ZxdjJuaDZiIn0.g0d3SzM5-a6Hj8PtMawuSw"
      {...viewport}
      onViewportChange={(nextViewport): void => setViewport(nextViewport)}
      mapStyle="mapbox://styles/mapbox/streets-v10"
    >
      <Marker latitude={35.7505} longitude={50.9264} offsetLeft={-20} offsetTop={-10}>
        <LocationOnOutlined style={{
          color: 'red',
        }}
        />
      </Marker>
      <GeolocateControl
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          margin: 10,
        }}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation
      />
    </ReactMapGL>
  );
}

export default Map;
