export const GAMES = {
  COLONIZERS: 'colonizers',
  CITADELS: 'citadels',
  CODENAMES: 'codenames',
  PAINTING: 'painting',
  HANABI: 'hanabi',
  GNOMES: 'saboteur',
  TICKET: 'ticket',
  AMONG_US: 'among_us',
  ERUDIT: 'erudit',
  HAT: 'hat',
  TEST: 'test',
};

export const gamesInfo = {
  [GAMES.COLONIZERS]: {
    rusName: 'Колонизаторы',
    roleId: '864445609666019398',
    emoji: '🐑',
  },
  [GAMES.CITADELS]: {
    rusName: 'Цитадели',
    roleId: '835099053167214615',
    emoji: '🏰',
  },
  [GAMES.CODENAMES]: {
    rusName: 'Коднеймс',
    roleId: '835099259388690462',
    emoji: '💬',
  },
  [GAMES.PAINTING]: {
    rusName: 'Рисовалка',
    roleId: '840275369890152448',
    emoji: '🖌',
  },
  [GAMES.HANABI]: {
    rusName: 'Ханаби',
    roleId: '857935431071956992',
    emoji: '🎆',
  },
  [GAMES.GNOMES]: {
    rusName: 'Гномы-вредители',
    roleId: '1003646101733265440',
    emoji: '⛏',
  },
  [GAMES.TICKET]: {
    rusName: 'Ticket to Ride',
    roleId: '983433303841464350',
    emoji: '🚂',
  },
  [GAMES.AMONG_US]: {
    rusName: 'Among Us',
    roleId: '835099409607032873',
    emoji: '🚀',
  },
  [GAMES.ERUDIT]: {
    rusName: 'Эрудит',
    roleId: '895700081351733319',
    emoji: '🧠',
  },
  [GAMES.HAT]: {
    rusName: 'Шляпа',
    roleId: '850098154410082334',
    emoji: '🎩',
  },
  [GAMES.TEST]: {
    rusName: 'тест',
    roleId: '1007983174053265418',
    emoji: '🤖',
  }
};

export const gamesByRoleIds = Object.entries(gamesInfo).reduce((acc, [gameId, gameValue]) => {
  gameValue.id = gameId
  acc[gameValue.roleId] = gameValue
  return acc
}, {});
