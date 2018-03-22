const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_ROLES')) return errors.noPermissions(message, 'MANAGE_ROLES');

  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return errors.invalidUser(message);

  let role = args.join(' ').slice(22);
  if (!role) return message.reply('Please specify a role.');
  let guildRole = message.guild.roles.find('name', role);
  if (!role) return message.reply('Couldn\'t find that role.');

  if (user.roles.has(guildRole.id)) return message.reply('That role does exist!');
  await (user.addRole(guildRole.id));

  let embed = new Discord.RichEmbed()
  .setTitle('User has been assigned to a role.')
  .setColor(config.green)
  .addField('Assigned User:', `${user}`)
  .addField('Assigned By:', `${message.author}`)
  .addField('Assigned Role:', `${role}`);

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return errors.noLogChannel(message);

  auditlogchannel.send(embed);
  return
};

module.exports.help = {
  name: 'addrole',
  description: 'This will add a role to the mentioned user.',
  usage: 'addrole [user] [role]'
};
