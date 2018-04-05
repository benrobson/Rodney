const Discord = require('discord.js');
const config = require('../config.json');
const ms = require('ms');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {

  if (!message.member.hasPermission('MANAGE_MESSAGES')) return errors.noPermissions(message, 'MANAGE_MESSAGES');

  let user = message.guild.member(message.mentions.members.first());
  if (!user) return errors.invalidUser(message);

  let muterole = message.guild.roles.find('name', 'Muted');

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return errors.noLogChannel(message);

  user.removeRole(muterole.id)
    let embed = new Discord.RichEmbed()
    .setTitle('User has been Unmuted')
    .setColor(config.yellow)
    .addField('Muted User', `${user}`)
    auditlogchannel.send(embed);
  ms(time);
};

module.exports.help = {
  name: 'unmute',
  description: 'Unmutes a user.',
  usage: 'unmute [@user]'
};
