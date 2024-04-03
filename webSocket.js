import {load} from './script.js'

let ws = new WebSocket('wss://na22-1.github.io/AUC-Frontend/user');

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
