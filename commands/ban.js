const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');
const chalk = require('chalk');

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

  let reason = args.slice(1).join(' ');
  if (!reason) return errors.invalidReason(message);

  if (user.hasPermission(`${module.exports.help.permission}`)) return errors.cannotPunish(message);

  let createdAtRaw = message.createdAt.toDateString();
  let createdAt = createdAtRaw.split(' ');

  let embed = new Discord.RichEmbed()
  .setTitle('User has been banned')
  .setColor(config.red)
  .addField('Banned User', `${user}`, true)
  .addField('Banned By', `${message.author}`, true)
  .addField('Banned in Channel', message.channel)
  .addField('Time', `${createdAt[0]} ${createdAt[2]} ${createdAt[1]} ${createdAt[3]}`, true)
  .addField('Reason', reason);

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return errors.noLogChannel(message);

  auditlogchannel.send(embed);
  message.member(user).ban(reason);

  console.log(chalk.yellow(`[${message.guild}]`) + ` ${message.author.username} has banned ${user.user.username} from ${message.guild} for ${reason}.`);
  return
};

module.exports.help = {
  name: 'ban',
  description: 'This will permanently bans a user from the guild with the reason provided.',
  permission: 'BAN_MEMBERS',
  usage: 'ban [@user] [reason]'
};
