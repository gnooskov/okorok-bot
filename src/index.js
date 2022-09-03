import { Client, GatewayIntentBits, Partials } from 'discord.js';
import dotenv from 'dotenv';

import { OKOROK_BOT_ID, BOT_PREFIX } from './config.js';
import { invitation } from './commands/invitation.js';
import { anek } from './commands/anek.js';
import { createInviteReactions } from './commands/createInviteReactions.js';

// const invitingChannelId = 849611337574121472;
// const invitingChannel = Client.channels.cache.get(invitingChannelId);

dotenv.config();

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
    createInviteReactions(message);
  }

  if (!reactToMessage || message.author.bot) {
    return;
  }

  const messageWords = content.split(' ');
  const commandToPerform = messageWords[0].slice(1).toLowerCase();

  if (commandToPerform.match(/(анек(дот)?|fytr|ane(k(dot)?|cdot(e)?)|aneque)/)) {
    anek(message);
  }

  if (commandToPerform.match(/пригл(аси(ть)?|ашаю|ашай|ос)/)) {
    invitation(message, messageWords);
  }
});

client.on('ready', () => {
  console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);