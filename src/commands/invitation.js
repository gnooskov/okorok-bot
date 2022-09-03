import { gamesInfo } from '../gamesInfo.js';
import { possibleGames } from '../possibleGames.js';

export const invitation = (message, messageWords) => {
  const gamesMentioned = messageWords.reduce((acc, item) => {
    if (possibleGames[item]) {
      acc.push(possibleGames[item])
    }
    return acc;
  }, []);

  if (gamesMentioned.length) {
    const gamesMentionedString = gamesMentioned.map(gameId => `<@&${gamesInfo[gameId].roleId}>`).join(', ');
    const messageToSend = `<@${message.author.id}> приглашает в: ${gamesMentionedString}`;
    message.channel.send(messageToSend);
  }
}