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

module.exports.createEmailTemplate = (event, context, callback) => {

  const { 
    TemplateName = '', 
    HtmlPart = '', 
    SubjectPart = '', 
    TextPart = '' 
  } = JSON.parse(event.body || '{}');
  
  if( !TemplateName || !HtmlPart || !SubjectPart || !TextPart)
    return callback(null, createResponse({message: 'Faltan parametros [TemplateName, HtmlPart, SubjectPart, TextPart]'}, 400));
  
  let params = {
    Template: {
      TemplateName,
      HtmlPart,
      SubjectPart,
      TextPart
    },
  };

  ses.createTemplate(params, (error, result) => {
    if (error) {
      console.error(error);
      response = {
        success: false,
        message: 'Template no creado',
        message2: error.message
      };

      return callback(null,createResponse(response,error.statusCode || 400));
    }

    const response = {
        success: true,
        message: 'Template creado correctamente'
      }
    callback(null, createResponse(response));
  });
};