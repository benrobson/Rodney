const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let icon = client.user.displayAvatarURL;
  let embed = new Discord.RichEmbed()

  .setDescription(`**Information about ${client.user.username}**`)
  .setColor(config.plainembedcolor)
  .setThumbnail(icon)
  .addField('Bot Name:', client.user.username)
  .addField('Created At:', client.user.createdAt)
  .addField('Current Version:', package.version);

  return message.channel.send(embed);
}

module.exports.help = {
  name: 'botinfo'
}
