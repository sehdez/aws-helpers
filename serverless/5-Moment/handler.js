'use strict';

const moment = require('moment-timezone');
moment.locale('es');

const createResponse = ( body = {}, statusCode = 200 ) => {
  return {
    statusCode,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
}

module.exports.GetMoment = async (event) => {
  try {
    const tiempoSec = new Date();
    const tiempoTZ = moment.tz( tiempoSec, 'America/Mexico_City' )

    return createResponse( {tiempoSec, tiempoTZ})
  } catch (error) {
    return createResponse({ message: error.message }, 400)
  }
  

};