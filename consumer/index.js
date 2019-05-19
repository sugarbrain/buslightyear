const amqp = require('amqplib/callback_api');

const WebSocketServer = require('ws').Server;

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

      const wss = new WebSocketServer({host: 'consumer', port: 3005, path: '/bus_ping'});
      wss.on('connection', function(ws) {
        console.log(" [*CONSUMER*] Waiting for messages in %s. To exit press CTRL+C", CONFIG.QUEUE);
        console.log(' [*CONSUMER*] New connection');

        channel.consume(CONFIG.QUEUE, function(msg) {
          ws.send(msg.content.toString());
          console.log(" [x] Received %s", msg.content.toString());
        }, { noAck: true });

      });
    });
  });
}

setTimeout(() => main(), 5000);
