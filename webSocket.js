import {refresh} from './script.js'


const url = 'auc-web-q448.onrender.com';

let ws = new WebSocket('wss://' + url +'/user');

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