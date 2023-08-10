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

module.exports.deleteEmailTemplate = (event, context, callback) => {
  const { TemplateName } = event.pathParameters;

  ses.deleteTemplate({TemplateName}, (error, result) => {
    if (error) {
      console.error(error);
      response = {
        success: false,
        message: 'Template no eliminado',
        message2: error.message
      };

      return callback(null,createResponse(response,error.statusCode || 400));
    }

    const response = {
        success: true,
        message: 'template correctamente',
        dataParams: TemplateName,
        result
      }
    callback(null, createResponse(response));
  });
};