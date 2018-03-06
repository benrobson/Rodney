const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let icon = message.guild.iconURL;
  let embed = new Discord.RichEmbed()

  .setTitle(`Information about ${message.guild.name}`)
  .setColor(config.plainembedcolor)
  .setThumbnail(icon)
  .addField('Server Name:', message.guild.name)
  .addField('Created At:', message.guild.createdAt)
  .addField('Server Owner:', message.guild.owner)
  .addField('You Joined:', message.member.joinedAt)
  .addField('Total Members:', message.guild.memberCount);

  return message.channel.send(embed);
}

module.exports.help = {
  name: 'serverinfo',
  description: 'Displays information about the server/guild',
  usage: 'serverinfo'
}
