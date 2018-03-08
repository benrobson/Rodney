const Discord = require('discord.js'); // this links to the official Discord npm package
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
  .addField('Created At:', client.user.createdAt)
  .addField('Current Version:', package.version, true)
  .addField('Current Discord.js Version:', '*Coming Soon*', true)
  .addField('Total Number of Users:', '*Coming Soon*', true)
  .addField('Total Number of Servers:', client.guilds.size, true);

  return message.channel.send(embed);
}

module.exports.help = {
  name: 'botinfo',
  description: 'Displays information about the bot.',
  usage: 'botinfo'
}
