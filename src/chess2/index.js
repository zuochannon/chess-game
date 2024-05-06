
// This is assuming that the 'Chessboard' and 'Chess' are defined or imported correctly.
import { Chess } from 'chess.js'; // If you're using ES6 modules
import { Chessboard } from 'chessboardjs'; // Adjust this based on your actual imports

let gameHasStarted = false;
let board = null;
let game = new Chess();
let $status = $('#status');
let $pgn = $('#pgn');
let gameOver = false;
const socket = io('http://localhost:5173'); // Adjust URL to your server

const timers = {
   white: 900,  // 15 minutes in seconds
   black: 900,
   turn: 'white'
 };
  function startTimer() {
   window.timerInterval = setInterval(() => {
     if (timers[timers.turn] > 0) {
       timers[timers.turn]--;
       displayTime();
     } else {
       clearInterval(window.timerInterval);
       alert(timers.turn + " loses on time!");
     }
   }, 1000);
 }
  function switchTurn() {
   timers.turn = timers.turn === 'white' ? 'black' : 'white';
 }
  function displayTime() {
   document.getElementById('white-timer').textContent = formatTime(timers.white);
   document.getElementById('black-timer').textContent = formatTime(timers.black);
 }
  function formatTime(time) {
   const minutes = Math.floor(time / 60);
   const seconds = time % 60;
   return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
 }
  socket.on('newMove', function(move) {
   game.move(move);
   board.position(game.fen());
   updateStatus();
   switchTurn();
});


socket.on('updateTimers', function(timers) {
   document.getElementById('white-timer').textContent = formatTime(timers.white);
   document.getElementById('black-timer').textContent = formatTime(timers.black);
});


socket.on('timeOut', function(turn) {
   alert(turn + " loses on time!");
   gameOver = true;
   updateStatus();
});




function onDragStart (source, piece, position, orientation) {
   // do not pick up pieces if the game is over
   if (game.game_over()) return false
   if (!gameHasStarted) return false;
   if (gameOver) return false;


   if ((playerColor === 'black' && piece.search(/^w/) !== -1) || (playerColor === 'white' && piece.search(/^b/) !== -1)) {
       return false;
   }


   // only pick up pieces for the side to move
   if ((game.turn() === 'w' && piece.search(/^b/) !== -1) || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
       return false
   }
}


function onDrop (source, target) {
   let theMove = {
       from: source,
       to: target,
       promotion: 'q' // NOTE: always promote to a queen for simplicity
   };
   // see if the move is legal
   var move = game.move(theMove);




   // illegal move
   if (move === null) return 'snapback'


   socket.emit('move', theMove);


   updateStatus()
}


socket.on('newMove', function(move) {
   game.move(move);
   board.position(game.fen());
   updateStatus();
});


// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
   board.position(game.fen())
}


function updateStatus () {
   var status = ''


   var moveColor = 'White'
   if (game.turn() === 'b') {
       moveColor = 'Black'
   }


   // checkmate?
   if (game.in_checkmate()) {
       status = 'Game over, ' + moveColor + ' is in checkmate.'
   }


   // draw?
   else if (game.in_draw()) {
       status = 'Game over, drawn position'
   }


   else if (gameOver) {
       status = 'Opponent disconnected, you win!'
   }


   else if (!gameHasStarted) {
       status = 'Waiting for black to join'
   }


   // game still on
   else {
       status = moveColor + ' to move'


       // check?
       if (game.in_check()) {
           status += ', ' + moveColor + ' is in check'
       }
      
   }


   if (game.in_checkmate() || game.in_draw() || gameOver) {
       clearInterval(window.timerInterval);
   }


   $status.html(status)
   $pgn.html(game.pgn())
}


var config = {
   draggable: true,
   position: 'start',
   onDragStart: onDragStart,
   onDrop: onDrop,
   onSnapEnd: onSnapEnd,
   pieceTheme: '/public/img/chesspieces/wikipedia/{piece}.png'
}
board = Chessboard('myBoard', config)
if (playerColor == 'black') {
   board.flip();
}


updateStatus()


var urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('code')) {
   socket.emit('joinGame', {
       code: urlParams.get('code')
   });
}


socket.on('startGame', function() {
   gameHasStarted = true;
   startTimer(); // Make sure this starts the local timer correctly
   updateStatus();
});


socket.on('gameOverDisconnect', function() {
   gameOver = true;
   updateStatus()
});
