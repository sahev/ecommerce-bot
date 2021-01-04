import bodyParser from 'body-parser'
import { sendMessage } from "./sender.js";
import creator from './creator.js'
import { createSession, getSession } from '../db/db.js';

let sessionData = []

function setClients(clients) {
  sessionData = clients
}

function routes(app) {  
  app.use( bodyParser.json() );  

  app.post("/send", async (req, res) => {
    const { number, message, client } = req.body
    const session = sessionData[client]
    let resp = await sendMessage(session, number + '@c.us', message)
    res.json({ resp })
  })

  app.get("/getSession/:id", async function (req, res) {
    var response = await getSession(req.params['id'])
    res.json({ data: response[0][0].ses_data });
  });

  app.post("/start/:name", (req, res) => {
    
    //console.log(req.params['name']);
    creator(req.params['name'])
    
    res.json({ res: req.params['name'] })
  })

}


export { routes, setClients }