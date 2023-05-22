const redis = require("redis");
const publisher = redis.createClient()

class send_email {

    async send(data) {
        try {
            await publisher.connect();
            await publisher.publish("user", JSON.stringify(data))

        } catch (error) {
            console.error('Erro no Redis:', error);
        } finally {

            publisher.quit();
        }

    }
}

export default new send_email()