import axios from 'axios';

axios.defaults.headers.common.Accept = 'application/json';

const fetch = (endpoint) => {
return axios
    .get(endpoint)
    .then((res) => res)
    .catch((err) => {
    console.error(
        'Error catch in Apiutils at fetch method. It will be thrown...');
    throw err;
    });
}

export const getPoints = (user = '', apiKey = '', table = '', latlng = {lat: undefined, lng: undefined}, meters = 1000) => {
    const {lng, lat} = latlng;
    const query = `https://${user}.carto.com/api/v2/sql?api_key=${apiKey}&q=SELECT * FROM ${table}`;
    return fetch(query)
      .then(res=> {
        const data = [];
        res.data.rows.forEach(point=>{
          data.push({lng: point.longitude, lat: point.latitude, color: point.color})
      });
      return data;
      });
};
