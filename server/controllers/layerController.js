// Variables initialization
const Pool = require('pg').Pool
const GeoJSON = require('geojson');
const config = require('../config');
const { db: { user, host, database, password, port } } = config;

// Pool instance
const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
})

// Query
const getGeojson = (request, response, next) => {
    // Almacenamos la consulta SQL
    //let queryLayer = 'SELECT  id,  st_x(geom ) as lng, st_y(geom ) as lat, nombre,  tipo,  cod_mun,  municipio,  provincia FROM alojamientodera;'
    let queryLayer = 'SELECT cartodb_id, st_x(the_geom::geometry ) as lng, st_y(the_geom::geometry ) as lat, tipo, latitude, longitude, color FROM puntosExamen;'

    pool.query(queryLayer, (err, res) => {
        if (err) {
            return console.error('Error ejecutando la consulta. ', err.stack)
        }
        let geojson = GeoJSON.parse(res.rows, { Point: ['lat', 'lng'] });
        
        response.set('Access-Control-Allow-Origin', '*');
        response.json(geojson);
    })
}

// Exportamos las funciones para ser usadas dentro de la aplicación
module.exports = { getGeojson } 
