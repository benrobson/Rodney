const Discord = require('discord.js');
const config = require('../config.json');
const chalk = require('chalk');

module.exports = async member => {
  let auditlogchannel = member.guild.channels.find(c => c.name === 'audit-log');
  if (!auditlogchannel) return

  let embed = new Discord.RichEmbed()
    .setTitle(`${member.user.username} has left the guild.`)
    .setColor(config.red)
    .addField('Tag', member, true)
  auditlogchannel.send(embed);

  console.log(chalk.yellow(`[${member.guild}]`) + ` ${member.user.username} has left the ${member.guild} Guild.`);

  // This option is only useful if you run the bot locally, yourself.
  if (config.guildid == '450938867034619914') {
    if (!config.userchannel) return;
    member.guild.channels.get(config.userchannel).setName(`Total Users: ${member.guild.memberCount}`);
    return;
  } else {
    return;
  }
};
