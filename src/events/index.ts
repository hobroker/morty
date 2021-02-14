import { connect, Connection, Channel } from "amqplib";

class RabbitMQ {
  private connection!: Connection;
  private channel!: Channel;
  private readonly uri: string;
  private readonly queue: string;

  constructor(uri: string) {
    this.uri = uri;
    this.queue = "";
  }

  async connect() {
    this.connection = await connect(this.uri);
    this.channel = await this.connection.createChannel();

    await this.channel.assertQueue(this.queue, { durable: false });
  }

  send(message: string) {
    this.channel.sendToQueue(this.queue, Buffer.from(message));
    console.log(" [x] Sent %s", message);
  }

  async receive() {
    await this.channel.consume(this.queue, (message) => {
      if (message === null) {
        throw new Error("message is null");
      }

      const result = message.content.toString();
      console.log(`Receive ${result}`);
    });
  }
}

export = RabbitMQ;
