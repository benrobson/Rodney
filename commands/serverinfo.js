const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let icon = message.guild.iconURL;
  let embed = new Discord.RichEmbed()

  .setTitle(`Information about ${message.guild.name}`)
  .setColor(config.plainembedcolor)
  .setThumbnail(icon)
  .addField('Server Name:', message.guild.name, true)
  .addField('Server Owner:', message.guild.owner, true)
  .addField('Created At:', message.guild.createdAt)
  .addField('Server Region:', message.guild.region, true)
  .addField('Total Members:', message.guild.memberCount, true)
  .addField('Large [over 250 members]:', message.guild.large);

  return message.channel.send(embed);
}

module.exports.help = {
  name: 'serverinfo',
  description: 'Displays information about the server/guild',
  usage: 'serverinfo'
}
