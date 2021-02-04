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

  export const getPoints = (user = '', apiKey = '', table = '') => {
    const query = "http://localhost:3002/api/layers/layer";
    return fetch(query)
      .then(res=> {
        const data = [];
        res.data.features.forEach(point=>{
          data.push({lat: point.geometry.coordinates[1], lng: point.geometry.coordinates[0]})
      });
      return data;
      });
  };

  export const getAdress = (lat, lon) => {
    const query = 'https://nominatim.openstreetmap.org/reverse.php?lat=' + lat 
    +'&lon=' + lon + '&zoom=18&format=jsonv2';;
    return fetch(query)
      .then((res)=> {
        return res.data.display_name;
      });
  };