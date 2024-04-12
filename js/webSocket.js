import {refresh} from './script.js'


const url = 'localhost:8080';

let ws = new WebSocket('ws://' + url +'/user');

ws.onmessage = message => {
    refresh();
}
ws.onerror = function(error) {
    console.error('WebSocket error:', error);
};
function onClick() {
    ws.send("Update!")
}

export {onClick}