import {load} from './script.js'

let ws = new WebSocket('ws://AUC-Web-env.eba-kfh4ewj6.eu-north-1.elasticbeanstalk.com/user');

ws.onmessage = message => {
    load();
}

function onClick() {
    ws.send("Update!")
}

export {onClick}