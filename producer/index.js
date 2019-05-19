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
  
      channel.assertQueue(CONFIG.QUEUE, {
        durable: false
      });
  
      setInterval(() => {
        const msg = "test";
        channel.sendToQueue(CONFIG.QUEUE, Buffer.from(msg));
        console.log(`[x] Sent: ${msg}`);
      }, 3000);
    });
  });
}

setTimeout(() => main(), 5000);
