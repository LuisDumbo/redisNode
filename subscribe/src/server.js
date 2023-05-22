import express from "express";
import EmailSender from "./EmailSender";
const redis = require("redis");

const client = redis.createClient();
const subscriber = client.duplicate();

const app = express();
app.use(express.json());


(async () => {

    await subscriber.connect();

    await subscriber.subscribe('user', (message) => {
        const NewUser = JSON.parse(message)
        const sendMail = new EmailSender();
        sendMail.sendEmail(`${NewUser.email}`, 'verificação de email', 'link http://localhost:3004/');
    });

})();

app.listen(3004, () => {
    console.log("servidor ligado n aporta 3004")
})