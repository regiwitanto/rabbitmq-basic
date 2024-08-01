const amqp = require('amqplib');

const init = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'basic-queue';

  await channel.assertQueue(queue, {
    durable: true,
  });

  channel.consume(
    queue,
    (message) => {
      console.log(
        `Message received: ${message.content.toString()} from ${queue}`
      );
    },
    {
      noAck: true,
    }
  );
};

init();
