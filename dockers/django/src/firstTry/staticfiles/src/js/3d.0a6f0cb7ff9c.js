import { create2Pgame } from './2pGame/create2p.js';
import { createMultigame } from './multigame/createMultigame.js';


const NO_MAP = 0;
const MOUNTAIN_MAP = 1;
const DESERT_MAP = 2;
const HELL_MAP = 3;
const SPACE_MAP = 4;

// js test socket
// const socket = new WebSocket('ws://' + window.location.host + '/ws/pong/');
/* const socket = new WebSocket('ws://localhost:8000/ws/pong/');


socket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    console.log(data.message);
};

socket.onopen = function(e) {
    console.log('WebSocket connection opened.');
	sendMessage('Hello, Pong!');
};

socket.onclose = function(e) {
    console.log('WebSocket connection closed.');
};

function sendMessage(message) {
    socket.send(JSON.stringify({
        'message': message
    }));
} */

// js test


// make player names centered
startGame(7, 1, DESERT_MAP, [0, 0]);

function startGame(playerCount, mappov, map, score)
{
	if (playerCount == 2 && mappov < 3)
		create2Pgame(mappov, score);
	else if (playerCount > 2 && playerCount <= 8)
		createMultigame(playerCount, mappov, map);
}
