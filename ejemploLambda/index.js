const AWS = require('aws-sdk')
const sqs = new AWS.SQS();

exports.handler = async (event, context) => {
  const queueUrl = 'https://sqs.us-east-1.amazonaws.com/003559369313/cola1'; // Reemplaza con la URL de tu cola de SQS
  
  const messageParams = {
    MessageBody: JSON.stringify({ key: 'value' }) // El contenido del mensaje
  };
  
  try {
    const sendMessageResponse = await sqs.sendMessage({
      QueueUrl: queueUrl,
      ...messageParams
    }).promise();
    
    console.log('Mensaje enviado:', sendMessageResponse.MessageId);
    
    return {
      statusCode: 200,
      body: JSON.stringify('Mensaje enviado con éxito')
    };
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify('Error al enviar el mensaje')
    };
  }
};
