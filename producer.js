const amqp = require('amqplib');

const init = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'basic-queue';
  const message = 'Hello World!';

  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(queue, Buffer.from(message));
  console.log(`Message sent: ${message}`);

  setTimeout(() => {
    connection.close();
  }, 1000);
};

init();
