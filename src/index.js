import { Client, GatewayIntentBits, Partials } from 'discord.js';

import { OKOROK_BOT_ID, BOT_PREFIX } from './config.js';
import { BOT_TOKEN } from './token.js';
import { invitation } from './commands/invitation.js';
import { anek } from './commands/anek.js';

// const invitingChannelId = 849611337574121472;
// const invitingChannel = Client.channels.cache.get(invitingChannelId);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,  
    GatewayIntentBits.GuildMessageReactions, 
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ], 
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

client.on('messageCreate', (message) => {
  const { content } = message
  const isTalkingToMe = content.indexOf(`<@${OKOROK_BOT_ID}>`) > -1;
  const isBotCommand = content.startsWith(BOT_PREFIX);
  const reactToMessage = isTalkingToMe || isBotCommand;

  if (message.author.id === OKOROK_BOT_ID) {
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

  if (!reactToMessage || message.author.bot) {
    return;
  }

  const messageWords = content.split(' ');
  const commandToPerform = messageWords[0].slice(1).toLowerCase();

  if (commandToPerform.match(/анек/)) {
    anek(message);
  }

  if (commandToPerform.match(/пригл(аси(ть)?|ашаю|ашай|ос)/)) {
    invitation(message);
  }
});

client.on('ready', () => {
  console.log('Ready!');
});

client.login(BOT_TOKEN);