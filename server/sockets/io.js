

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New socket connection');
        let currentCode = null;

        socket.on('move', function(move) {
            console.log('move detected');
            const game = games[currentCode];
            if (game) {
                game.switchTurn();
                io.to(currentCode).emit('newMove', move);
                io.to(currentCode).emit('updateTimers', game.timers);
            }
        });

        socket.on('joinGame', function(data) {
            currentCode = data.code;
            socket.join(currentCode);
            if (!games[currentCode]) {
                games[currentCode] = {
                    players: 1,
                    timers: {
                        white: 900, // 15 minutes in seconds
                        black: 900
                    },
                    turn: 'white',
                    decrementTimer: function() {
                        this.timers[this.turn]--;
                        if (this.timers[this.turn] <= 0) {
                            io.to(currentCode).emit('timeOut', this.turn);
                            clearInterval(this.timerInterval);
                        }
                    },
                    switchTurn: function() {
                        this.turn = this.turn === 'white' ? 'black' : 'white';
                        clearInterval(this.timerInterval);
                        this.startTimer();
                    },
                    startTimer: function() {
                        this.timerInterval = setInterval(() => this.decrementTimer(), 1000);
                    }
                };
            } else {
                games[currentCode].players++;
                if (games[currentCode].players === 2) {
                    games[currentCode].startTimer();
                    io.to(currentCode).emit('startGame');
                }
            }
        });

        socket.on('disconnect', function() {
            console.log('socket disconnected');
            if (currentCode && games[currentCode]) {
                io.to(currentCode).emit('gameOverDisconnect');
                clearInterval(games[currentCode].timerInterval);
                delete games[currentCode];
            }
        });
    });
};
