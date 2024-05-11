const totalGames = (data) => {
  return Object.values(data).length;
};

const winRate = (data) => {
  return data.won?.length / totalGames(data);
};

const lossRate = (data) => {
  return data.lost?.length / totalGames(data);
};

const drawRate = (data) => {
  return data.draw?.length / totalGames(data);
};

export const analyzeData = (data) => {
  return {
    winRate: {
        name: "Win Rate",
        data: winRate(data).toPrecision(3),
    },
    lossRate: {
        name: "Loss Rate",
        data: lossRate(data).toPrecision(3),
    },
    drawRate: {
        name: "Draw Rate",
        data: drawRate(data).toPrecision(3),
    },
  };
};
