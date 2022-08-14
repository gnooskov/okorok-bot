import { gamesInfo } from '../gamesInfo.js';
import { gamesParsing } from '../gamesParsing.js';

export const invitation = (message) => {
  const gamesMentioned = messageWords.reduce((acc, item) => {
    if (gamesParsing[item]) {
      acc.push(gamesParsing[item])
    }
    return acc;
  }, []);

  if (gamesMentioned.length) {
    const gamesMentionedString = gamesMentioned.map(gameId => `<@&${gamesInfo[gameId].roleId}>`).join(', ');
    // const messageToSend = `<@${message.author.id}> приглашает в: ${gamesMentionedString}`;
    const messageToSend = `<@${message.author.id}> приглашает в: ${gamesMentionedString}`;
    message.channel.send(messageToSend);
    // invitingChannel.send(messageToSend);
  }
}