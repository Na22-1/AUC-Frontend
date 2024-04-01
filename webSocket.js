import {load} from './script.js'

let ws = new WebSocket('wss://AUC-Web-env.eba-kfh4ewj6.eu-north-1.elasticbeanstalk.com/user');

ws.onmessage = message => {
    load();
}
ws.onerror = function(error) {
    console.error('WebSocket error:', error);
};
function onClick() {
    ws.send("Update!")
}

export {onClick}