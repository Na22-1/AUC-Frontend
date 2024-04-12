import {load} from './script.js'

let ws = new WebSocket('ws://localhost:8080/user');

ws.onmessage = message => {
    load();
}

function onClick() {
    ws.send("Update!")
}

export {onClick}