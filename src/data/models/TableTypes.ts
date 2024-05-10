export type LeaderboardRow = {
    username: string;
    elo: number;
    timestamp: string,
};

export type GameHistoryRow = {
    gameid: string;
    timestamp: string;
    result: string;
    turns: number;
    playernames: string[];
    game_type: string;
    comments: string;
}

export type UserRow = LeaderboardRow | GameHistoryRow;
