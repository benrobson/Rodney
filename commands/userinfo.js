const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user) return errors.invalidUser(message);

  let kickable = message.member.kickable ? "✅" : "❎";
  let bannable = message.member.bannable ? "✅" : "❎";
  let icon = user.displayAvatarURL;

  let embed = new Discord.RichEmbed()
  .setTitle(`Information about ${message.author.username}`)
  .setColor(config.red)
  .setThumbnail(icon)
  .addField('Username', message.username, true)
  .addField('User ID', user.id, true)
  .addField('Status', user.presence.status, true)
  .addField('Roles:', '*Coming Soon*')
  .addField('Messages Sent:', '*Coming Soon*')
  .addField('Account Created at:', '*Coming Soon*')
  .addField('You Joined:', message.member.joinedAt)
  .addField('Bannable', bannable, true)
  .addField('Kickable', kickable, true);
  message.channel.send(embed);
  return
};

module.exports.help = {
  name: 'userinfo',
  description: 'Displays information about the user.',
  usage: 'userinfo [@user]'
}
