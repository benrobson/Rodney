const Discord = require('discord.js');
const config = require('../config.json');
const ms = require('ms');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (args == 'help') {
    let embed = new Discord.RichEmbed()
    .setTitle(`${module.exports.help.name} Command Information`)
    .setDescription(`${module.exports.help.description}`)
    .addField('Usage', `${config.prefix}${module.exports.help.usage}`, true)
    .addField('Permission', `${module.exports.help.permission}`, true)
    .setColor(config.cyan)
    message.channel.send(embed);
    return
  };

  if (!message.member.hasPermission(`${module.exports.help.permission}`)) return errors.noPermissions(message, `${module.exports.help.permission}`);

  let user = message.guild.member(message.mentions.members.first());
  if (!user) return errors.invalidUser(message);

  let muterole = message.guild.roles.find(c => c.name === 'Muted');
  if (user == !muterole) return errors.userNotMuted(message);

  let auditlogchannel = message.guild.channels.find(c => c.name === 'audit-log');
  if (!auditlogchannel) return errors.noLogChannel(message);

  await(user.removeRole(muterole.id))
    let embed = new Discord.RichEmbed()
    .setTitle('User has been Unmuted')
    .setColor(config.yellow)
    .addField('Muted User', `${user}`)
    auditlogchannel.send(embed);
    console.log(`[${message.guild}] ${user.user.username} has been unmuted in ${message.guild}.`);
};

module.exports.help = {
  name: 'unmute',
  description: 'Unmutes a user.',
  permission: 'MANAGE_MESSAGES',
  usage: 'unmute [@user]'
};
