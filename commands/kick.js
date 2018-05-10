const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return errors.noPermissions(message, 'MANAGE_MESSAGES');

  let user = message.guild.member(message.mentions.members.first());
  if (!user) return errors.invalidUser(message);

  let reason = args.slice(1).join(" ");
  if (!reason) return errors.invalidReason(message);

  if (user.hasPermission('MANAGE_MESSAGES')) return errors.cannotPunish(message);

  let createdAtRaw = message.createdAt.toDateString();
  let createdAt = createdAtRaw.split(' ');

  let embed = new Discord.RichEmbed()
  .setTitle('User has been Kicked')
  .setColor(config.blue)
  .addField('Kicked User:', `${user}`)
  .addField('Kicked By:', `${message.author}`)
  .addField('Kicked in Channel:', message.channel)
  .addField('Time', `${createdAt[0]} ${createdAt[2]} ${createdAt[1]} ${createdAt[3]}`)
  .addField('Reason:', reason);

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return errors.noLogChannel(message);

  auditlogchannel.send(embed);
  message.guild.member(user).kick(reason);
  console.log(`[${message.guild}] ${message.author.username} has kicked ${user.user.username} from ${message.guild} for ${reason}.`);
  return
};

module.exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user from the guild.',
  usage: 'kick [user] [reason]'
};
