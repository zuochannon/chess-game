export class GameInfo {
    constructor(whiteIP) {
      this.whiteIP = whiteIP;
      this.blackIP = -1;
      this.moves = [];
      this.lastMove = new Date();
      this.canJoin = () => !(this.whiteIP && this.blackIP); // if set both to null as default, so users can join
      // players with maxiumum of 2, every new other player is just spectator (cant move)
    }
  
    // Function to convert GameInfo object to a Redis hash
    toRedisHash() {
      return {
        whiteIP: this.whiteIP,
        blackIP: this.blackIP,
        moves: JSON.stringify(this.moves),
        lastMove: this.lastMove.toISOString(), // Store date as string
      };
    }
  
    // Function to load GameInfo object from a Redis hash
    static fromRedisHash(hash) {
      const gameInfo = new GameInfo(hash.whiteIP);
      gameInfo.blackIP = hash.blackIP;
      gameInfo.moves = JSON.parse(hash.moves);
      gameInfo.lastMove = new Date(hash.lastMove);
      return gameInfo;
    }
  }