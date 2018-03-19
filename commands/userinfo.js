const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let icon = message.author.avatarURL;

  let embed = new Discord.RichEmbed()
  .setTitle(`Information about ${message.author.username}`)
  .setColor(config.plainembedcolor)
  .setThumbnail(icon)
  .addField('Username:', message.author.username)
  .addField('Roles:', '*Coming Soon*')
  .addField('Messages Sent:', '*Coming Soon*')
  .addField('Account Created at:', '*Coming Soon*')
  .addField('You Joined:', message.member.joinedAt);
  message.channel.send(embed);
  return
};

module.exports.help = {
  name: 'userinfo',
  description: 'Displays information about the user mentioned',
  usage: 'userinfo'
}
