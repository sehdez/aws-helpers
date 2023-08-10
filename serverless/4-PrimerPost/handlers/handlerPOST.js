'use strict';

const handlerResponse = ( body = {}, statusCode = 200 ) => {
  return {
    statusCode,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
}

module.exports.servicioPOST = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let timestamp = new Date().getTime();
  const body =  JSON.parse(event.body);
  let fecha = timestamp;
  let nombre = body.nombre;
  let apellido = body.apellido;
  let numero = body.numero || null;

  if (!numero){
      const body = {message: 'hay un error en el numero'}
      return handlerResponse(body, 400)
  }else {
    numero = numero * 10
    const body = {
      message: 'Exito',
      data:{
        fecha,
        nombre,
        apellido,
        numero
      }
    }
    return handlerResponse(body) 
  }
};
