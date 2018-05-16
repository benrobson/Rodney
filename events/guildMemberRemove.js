const Discord = require('discord.js');
const config = require('../config.json');

module.exports = member => {
  let auditlogchannel = member.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return

  let embed = new Discord.RichEmbed()
  .setTitle('User has left the server!')
  .setColor(config.red)
  .addField('Username', member.user.username, true)
  .addField('Tag', member, true)
  auditlogchannel.send(embed);

  console.log(`[${member.guild}] ${member.user.username} has left the ${member.guild} Discord.`);

  if (!config.userchannel) return
  member.guild.channels.get(config.userchannel).setName(`Total Users: ${member.guild.memberCount}`);
}
