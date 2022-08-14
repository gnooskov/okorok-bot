import { gamesByRoleIds } from "../gamesInfo.js";

export const createInviteReactions = (message) => {
  const { content } = message;

  let hadReactions = false;
  const mentions = content.match(/(?!=<@)(\d+)(?=>)/g);
  mentions?.forEach((mention) => {
    const gameToMention = gamesByRoleIds[mention];
    if (!gameToMention) {
      return;
    }
    message.react(gameToMention.emoji);
    hadReactions = true;
  });

  if (hadReactions) {
    message.react('❌')
  }
}
