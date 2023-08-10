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


module.exports.sendEmailTemplate = (event, context, callback) => {
  const { TemplateName, destination, TemplateData } = JSON.parse(event.body || '{}');

  if( !TemplateName || !destination || !TemplateData)
    return callback(null, createResponse({message: 'Faltan parametros [TemplateName, destination, TemplateData]'}, 400));

  const params = {
    Destination: {
      ToAddresses: [destination],
    },
    Source: 'sergioahdez1994@gmail.com',
    Template: TemplateName,
    TemplateData: JSON.stringify(TemplateData)

  }


  ses.sendTemplatedEmail(params, (error, result) => {
    if (error) {
      console.error(error);
      response = {
        success: false,
        message: 'Email template no enviado',
        message2: error.message
      };

      return callback(null,createResponse(response,error.statusCode || 400));
    }

    const response = {
        success: true,
        message: 'Email template enviado correctamente',
        dataParams: params
      }
    callback(null, createResponse(response));
  });
};