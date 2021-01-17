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
    const query = `http://localhost:8005/api/v1/points`;
    return fetch(query)
        .then(res=> {
            const data = [];
            res.data.forEach(point=>{
                console.log(point);
                data.push({lat: point.latitude, lng: point.longitude})
            });
            return data;
        });
};

export const getAddress = (lat, lng) => {
    const query = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
    return fetch(query)
        .then(res=> {
            console.log(res.data)
            return res.data.display_name;
        });
};



//
