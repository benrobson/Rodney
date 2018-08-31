const Discord = require('discord.js');
const config = require('../config.json');

module.exports = member => {
  let auditlogchannel = member.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return

  let embed = new Discord.RichEmbed()
  .setTitle(`${member.user.username} has left the guild.`)
  .setColor(config.green)
  .addField('Tag', member, true)
  auditlogchannel.send(embed);

  console.log(`[${member.guild}] ${member.user.username} has left the ${member.guild} Guild.`);

  // This option is only useful if you run the bot locally, yourself.
  if (config.guildid == '450938867034619914') {
    if (!config.userchannel) return;
    member.guild.channels.get(config.userchannel).setName(`Total Users: ${member.guild.memberCount}`);
    return;
  } else {
    return;
  }
};
