const amqp = require('amqplib/callback_api');

const CONFIG = {
  RABBIT_HOST: 'amqp://rabbit',
  QUEUE: 'bus_ping'
};

function main() {
  amqp.connect(CONFIG.RABBIT_HOST, function(error0, connection) {
    if (error0) {
      throw error0;
    }

    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
  
      channel.assertQueue(CONFIG.QUEUE, { durable: false });
  
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", CONFIG.QUEUE);
      channel.consume(CONFIG.QUEUE, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
      }, { noAck: true });
  
    });
  });
}

setTimeout(() => main(), 5000);
