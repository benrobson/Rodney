const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  const commandNames = Array.from(client.commands.keys());
  const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
  message.channel.sendCode('asciidoc', `= Command List =\n\nUse ${config.prefix}help [command] for details\n\n${client.commands.map(c => `${config.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`);
};

module.exports.help = {
  name: 'help',
  description: 'This displays all things.',
  usage: 'help [command]'
};
