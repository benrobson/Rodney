const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let kickable = message.member.kickable ? "✅" : "❎";
  let bannable = message.member.bannable ? "✅" : "❎";
  let icon = message.author.avatarURL;

  let embed = new Discord.RichEmbed()
  .setTitle(`Information about ${message.author.username}`)
  .setColor(config.red)
  .setThumbnail(icon)
  .addField('Username', message.author.username, true)
  .addField('User ID', message.member.id, true)
  .addField('Roles:', '*Coming Soon*')
  .addField('Messages Sent:', '*Coming Soon*')
  .addField('Account Created at:', '*Coming Soon*')
  .addField('You Joined:', message.member.joinedAt)
  .addField('Banable', bannable, true)
  .addField('Kickable', kickable, true);
  message.channel.send(embed);
  return
};

module.exports.help = {
  name: 'userinfo',
  description: 'Displays information about the user.',
  usage: 'userinfo'
}
