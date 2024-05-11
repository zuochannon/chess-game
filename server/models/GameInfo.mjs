export class GameInfo {
  constructor(whiteUserID) {
    this.whiteUserID = whiteUserID;
    this.blackUserID = "-1";
    this.moves = [];
    this.lastMove = new Date();
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