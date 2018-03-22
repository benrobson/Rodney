const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS'))return errors.noPermissions(message, 'BAN_MEMBERS');

  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user) return errors.invalidUser(message);

  let reason = args.join(' ').slice(22);
  if (!reason) return errors.invalidReason(message);

  if (user.hasPermission('MANAGE_MESSAGES')) return errors.cannotPunish(message);

  let embed = new Discord.RichEmbed()
  .setTitle('User has been banned')
  .setColor(config.red)
  .addField('Banned User', `${user}`)
  .addField('Banned By:', `${message.author}`)
  .addField('Banned in Channel:', message.channel)
  .addField('Time:', message.createdAt)
  .addField('Reason:', reason);

  message.guild.member(user).ban(reason);

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return errors.noLogChannel(message);

  auditlogchannel.send(embed);
  return;
};

module.exports.help = {
  name: 'ban',
  description: 'This will permanently ban a user from the guild.',
  usage: 'ban [@user] [reason]'
};
