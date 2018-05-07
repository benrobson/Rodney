const Discord = require('discord.js');
const config = require('../config.json');

module.exports = member => {
  let auditlogchannel = member.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return

  let embed = new Discord.RichEmbed()
  .setTitle('User has joined the server!')
  .setColor(config.green)
  .addField('Username', member.user.username, true)
  .addField('Tag', member, true)
  auditlogchannel.send(embed)
  return

  if (!config.stats) return;
  if (!config.userid) return;
  member.guild.channels.get(config.userid).setName(`Users: ${member.guild.memberCount}`);
}
