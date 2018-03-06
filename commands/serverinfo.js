const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let icon = message.guild.iconURL;
  let embed = new Discord.RichEmbed()

  .setTitle(`Information about ${message.guild.name}`)
  .setColor(config.plainembedcolor)
  .setThumbnail(icon)
  .addField('Server Name:', message.guild.name)
  .addField('Server Owner:', message.guild.owner)
  .addField('Created At:', message.guild.createdAt)
  .addField('Server Region:', message.guild.region)
  .addField('Total Members:', message.guild.memberCount);

  return message.channel.send(embed);
}

module.exports.help = {
  name: 'serverinfo',
  description: 'Displays information about the server/guild',
  usage: 'serverinfo'
}
