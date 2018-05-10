const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.members.first());
  if (!user) return errors.invalidUser(message);

  let reason = args.slice(1).join(" ");
  if (!reason) return errors.invalidReason(message);

  let createdAtRaw = message.createdAt.toDateString();
  let createdAt = createdAtRaw.split(" ");

  let embed = new Discord.RichEmbed()
  .setTitle('Incoming Report!')
  .setColor(config.yellow)
  .addField('Reported User', `${user}`, true)
  .addField('Reported By', `${message.author}`, true)
  .addField('Reported in Channel', message.channel, true)
  .addField('Time', `${createdAt[0]} ${createdAt[2]} ${createdAt[1]} ${createdAt[3]}`)
  .addField('Reason', reason)

  let reportschannel = message.guild.channels.find('name', 'reports');
  if (!reportschannel) return errors.noReportChannel(message);

  message.delete().catch(O_o=>{});
  reportschannel.send(embed);
  console.log(`[${message.guild}] ${message.author.username} has reported ${user.user.username} for: ${reason}.`);
  return;
}

module.exports.help = {
  name: 'report',
  description: 'Report a player to the staff of this Discord server.',
  usage: 'report [@user] [reason]'
}
