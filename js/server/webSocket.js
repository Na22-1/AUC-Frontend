import {refresh} from '../script.js'


const url = 'auc-web-o8ve.onrender.com';
//const url = 'localhost:8080';

let ws = new WebSocket('wss://' + url +'/user');
//let ws = new WebSocket('ws://' + url +'/user');

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