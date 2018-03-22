const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return errors.invalidUser(message);

  let reason = args.join(' ').slice(22);
  if (!reason) return errors.invalidReason(message);

  let embed = new Discord.RichEmbed()
  .setTitle('Incoming Report!')
  .setColor(config.yellow)
  .addField('Reported User', `${user}`)
  .addField('Reported By', `${message.author}`)
  .addField('Reported in Channel', message.channel)
  .addField('Time', message.createdAt)
  .addField('Reason', reason);

  let reportschannel = message.guild.channels.find('name', 'reports');
  if (!reportschannel) return errors.noReportChannel(message);

  message.delete().catch(O_o=>{});
  reportschannel.send(embed);
  return;
}

module.exports.help = {
  name: 'report',
  description: 'Report a player to the staff of this Discord server.',
  usage: 'report [@user] [reason]'
}
