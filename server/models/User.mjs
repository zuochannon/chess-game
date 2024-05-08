export class User {
    constructor(IP, elo) {
      this.IP = IP;
      this.moves = [];
      this.lastMove = new Date();
      this.elo = elo;
    }
  
    // Function to convert GameInfo object to a Redis hash
    toRedisHash() {
      return {
        IP: this.IP,
        moves: JSON.stringify(this.moves),
        lastMove: this.lastMove.toISOString(), // Store date as string
        elo: this.elo,
      };
    }
  
    // Function to load GameInfo object from a Redis hash
    static fromRedisHash(hash) {
      const gameInfo = new User(hash.IP);
      gameInfo.moves = JSON.parse(hash.moves);
      gameInfo.lastMove = new Date(hash.lastMove);
      gameInfo.elo = hash.elo;
      return gameInfo;
    }
  }