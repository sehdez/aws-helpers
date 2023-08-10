'use strict';
const AWS = require('aws-sdk');

const ses = new AWS.SES({
  region: 'us-east-1' 
});

const createResponse = (message, statusCode = 200) => {
  return {
    statusCode,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(message)
  };
};


module.exports.sendEmail = (event, context, callback) => {
  let params = {
    Destination: { /* REQUERIDO */
      // CC emails: [
      //   ,
      //   /* emails */
      // ],
      ToAddresses: [
        event.pathParameters.ToEmail,
        /* emails */
      ]
    },
    Message: { /* REQUERIDO */
      Body: { /* REQUERIDO */

        // sólo puede ser html ó text
        Html: {
         Charset: "UTF-8",
         Data: `<html><body><h1 style="color:blue;display:flex; justify-content: center;" >Este es un correo de prueba</h1></body></html>`
        },
        // Text: {
        //  Charset: "UTF-8",
        //  Data: "Tu código de validación es: " + event.pathParameters.Code,
        // }
       },
       Subject: {
        Charset: 'UTF-8',
        Data: 'Email de registo - Test' 
       }
      },
    Source: 'sergioahdez1994@gmail.com', /* REQUERIDO */

  };

  ses.sendEmail(params, (error, result) => {
    if (error) {
      console.error(error);
      response = {
        success: false,
        message: 'Email no enviado',
        message2: error.message
      };

      return callback(null,createResponse(response,error.statusCode || 400));
    }

    const response = {
        success: true,
        message: 'Email enviado correctamente'
      }
    callback(null, createResponse(response));
  });
};