import {refresh} from './script.js'


const url = 'auc-web-q448.onrender.com';

let ws = new WebSocket('wss://' + url +'/user');

ws.onmessage = message => {
    let boardKey = message.data;
    console.log('Received data from server:', boardKey);

    refresh(boardKey);
}
ws.onerror = function(error) {
    console.error('WebSocket error:', error);
};
function onClick(boardKey) {
    ws.send(boardKey);
}

export {onClick}