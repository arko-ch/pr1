import openSocket from 'socket.io-client';
const socket = openSocket('http://dev.settlementapp99.com');

function addNPlayer(cb) {
    //socket.on('food_ready', res => cb(null, res.mailid)); //pixel tracker 081020
}

export { addNPlayer };