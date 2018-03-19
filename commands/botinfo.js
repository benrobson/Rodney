const Discord = require('discord.js'); // this links to the official Discord npm package
const { version } = require("discord.js");
const config = require('../config.json'); // this links to the config.json file
const package = require('../package.json'); // this links to the package.json file

module.exports.run = async (client, message, args) => {
  let icon = client.user.displayAvatarURL;
  let embed = new Discord.RichEmbed()

  .setTitle(`Information about ${client.user.username}`)
  .setColor(config.plainembedcolor)
  .setThumbnail(icon)
  .addField('Bot Name:', client.user.username, true)
  .addField('Bot Uptime:', `${client.uptime} [in miliseconds]`, true)
  .addField('Current Version:', package.version, true)
  .addField('Discord.js Version:', `v${version}`, true)
  .addField('Total Number of Users:', client.users.size, true)
  .addField('Total Number of Servers:', client.guilds.size, true)
  .addField('Ping:', new Date().getTime() - message.createdTimestamp + " ms", true);

  return message.channel.send(embed);
};

module.exports.help = {
  name: 'botinfo',
  description: 'Displays information about the bot.',
  usage: 'botinfo'
};
