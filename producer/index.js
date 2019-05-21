const amqp = require('amqplib/callback_api');
const mongoose = require('mongoose');

const CONFIG = {
  RABBIT_HOST: 'amqp://rabbit',
  QUEUE: 'bus_ping'
};

const BusPing = mongoose.model('bus_ping', new mongoose.Schema({
  'Unidad': Number,
  'nombre': String,
  'matricula': String,
  'Instante': String,
  'Estado': Number,
  'Comunica': Number,
  'CoordX': Number,
  'CoordY': Number,
  'Linea': String,
  'Ruta': String,
  'Posicion': String,
  'Viaje': String,
  'Velocidad': String
}, {
  collection: 'bus_ping'
}));

async function main() {
  mongoose.connect('mongodb://mongodb/buslightyear', function (err) {
    if (err) {
      console.log("error in connection: ", err);
      return;
    }
    console.log("connected successfully!");
  });

  let buses = [12229]; //await BusPing.find({}, 'Unidad').distinct('Unidad');
  console.log('BUSOES>>>>>>>>>>>>>>>>>>>>>: ' + buses.length);

  amqp.connect(CONFIG.RABBIT_HOST, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      channel.assertQueue(CONFIG.QUEUE, {
        durable: false
      });

      setInterval(() => {
        buses.forEach(async (unidad_bus) => {
          const first = await BusPing.findOne({
            'Unidad': unidad_bus,
            'CoordX': {
              $gt: 0
            },
            'CoordY': {
              $gt: 0
            }
          });

          if (first) {
            const msg = JSON.stringify(first);
            channel.sendToQueue(CONFIG.QUEUE, Buffer.from(msg));

            BusPing.deleteOne({
              'Unidad': first.Unidad
            }, (err, todo) => {
              // As always, handle any potential errors:
              if (err) console.log(err);
              else console.log("done!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            });
            // BusPing.findByIdAndDelete(first._id);

          }
        });
        console.log(`[x] Sent bus ping!`);
      }, 3000);
    });
  });
}

setTimeout(() => main(), 10000);