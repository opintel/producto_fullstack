import React, { useRef, useEffect } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import { getPoints } from '../Utils/ApiUils';
import './Map.css';

function Map (props) {
  const {
    lat,
    lng,
    zoom,
    basemapURL,
  } = props;

  let username = '';
  let apiKey = '';
  let tableName = '';

  if (process && process.env) {
    if(process.env.REACT_APP_USERNAME) {
      username = process.env.REACT_APP_USERNAME;
    }
    if(process.env.REACT_APP_API_KEY) {
      apiKey = process.env.REACT_APP_API_KEY;
    }
    if(process.env.REACT_APP_TABLE_NAME) {
      tableName = process.env.REACT_APP_TABLE_NAME;
    }
  }
  
  const map = useRef({});
    
  useEffect(() => {
    map.current = L.map('map', {
      center: [lat, lng],
      zoom,
      zoomControl: false
    });
    const basemap = L.tileLayer(basemapURL, {
      detectRetina: true,
      retina: '@2x',
    });
    basemap.addTo(map.current);

    const requestPoints = async (event) => {
      const {latlng} = event;

      const pointsLayer = await createPointsLayer(username, apiKey, tableName, latlng);
      const popup = L.popup({ closeButton: true });
      pointsLayer.addTo(map.current);
      
      pointsLayer.eachLayer(point=> {
        point.on('click', e => {

          let htmlContent;
          htmlContent = makeMarkupOnePoint(e.latlng.lat, e.latlng.lng, e.geocoding);
          popup.setContent(htmlContent);
          popup.setLatLng(e.latlng);
          if (!popup.isOpen()) {
            popup.openOn(map.current);
          }
        });
      });
    }

    map.current.on('click', requestPoints);

  }, [
    lat,
    lng,
    zoom,
    basemapURL,
    apiKey,
    tableName,
    username,
  ]);
  return (
    <div id="map"/>
  );
}

const createPointsLayer = async (user, key, tableName, geoJSON) => {
  let pointData;
  await getPoints(user, key, tableName, geoJSON, 1000).then(data=>pointData = data);

  const pointsArray = [];
  pointData.forEach(p=>{
    const circleMarker = L.circleMarker(p, {
      bubblingMouseEvents: false,
      color: `#${p.color}`
    }).setRadius(1);
    pointsArray.push(circleMarker);
  });

  return L.layerGroup(pointsArray);
};
    
function makeMarkupOnePoint(lat, lng, info = '') {
  return `
    <div class="widget">
    ${lat ? `
    <h3>${lat}, ${lng}</h3>
    `: ''}
    ${info ? `
    <h4>${info}</h4>
    `: '<h4>No hay dirección</h4>'}
    </div>
  `;
}
    
    
Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  basemapURL: PropTypes.string,
  zoom: PropTypes.number,
};
Map.defaultProps = {
  basemapURL: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png',
  zoom: 13,
}
    
export default Map;
    
