const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let large = message.guild.large ? "✅" : "❎";
  let icon = message.guild.iconURL;

  let embed = new Discord.RichEmbed()
  .setTitle(`Information about ${message.guild.name}`)
  .setColor(config.white)
  .setThumbnail(icon)
  .addField('Server Name', message.guild.name, true)
  .addField('Server Owner', message.guild.owner, true)
  .addField('Created At', message.guild.createdAt)
  .addField('Server Region', message.guild.region, true)
  .addField('Total Members:', message.guild.memberCount, true)
  .addField('Large', large, true)
  .addField('Verification Level', message.guild.verificationLevel, true)
  .addField('List of Channels', message.guild.channels.size)
  .addField('List of Roles', message.guild.verificationLevel);

  return message.channel.send(embed);
}

module.exports.help = {
  name: 'guildinfo',
  description: 'Displays information about the guild.',
  usage: 'guildinfo'
}
