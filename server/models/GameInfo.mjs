export class GameInfo {
  constructor(whiteUserID) {
    this.whiteUserID = whiteUserID;
    this.blackUserID = -1;
    this.moves = [];
    this.lastMove = new Date();
    this.canJoin = () => !(this.whiteUserID && this.blackUserID); // if set both to null as default, so users can join
    // players with maxiumum of 2, every new other player is just spectator (cant move)
  }

  // Function to convert GameInfo object to a Redis hash
  toRedisHash() {
    return {
      whiteUserID: this.whiteUserID,
      blackUserID: this.blackUserID,
      moves: JSON.stringify(this.moves),
      lastMove: this.lastMove.toISOString(), // Store date as string
    };
  }

  // Function to load GameInfo object from a Redis hash
  static fromRedisHash(hash) {
    const gameInfo = new GameInfo(hash.whiteUserID);
    gameInfo.blackUserID = hash.blackUserID;
    gameInfo.moves = JSON.parse(hash.moves);
    gameInfo.lastMove = new Date(hash.lastMove);
    return gameInfo;
  }
}