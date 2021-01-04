import bot from "venom-bot";
import express from "express";
import bodyParser from "body-parser";
import { routes, setClients } from "./api/routes.js";
import creator from "./api/creator.js";
import { connect, getSession } from "./db/db.js";
import { sendMessage } from "./api/sender.js";

connect();

const app = express();
let clients = [];

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("connected");
});

bot.create("teste").then(async (client) => {
  start(client);
  clients.teste = client;
  //var response = await getSession(1)
  //console.log(response[0][0].ses_data)
});

function start(client) {
  client.onMessage((message) => {
    if (!message.isGroupMsg) {
      sendMessage(client, message.from, "auto resposta");
      console.log(message.from);
    }
  });
}

routes(app, setClients(clients));
