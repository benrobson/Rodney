const Discord = require('discord.js');
const config = require('../config.json');

module.exports = (channel, message) => {
  if (channel.type === "dm") return;

  let auditlogchannel = channel.guild.channels.find(c => c.name === 'audit-log');
  if (!auditlogchannel) return;

  let embed = new Discord.RichEmbed()
  .setTitle(`A ${channel.type} channel called ${channel.name} has been created.`)
  .setColor(config.green)
  auditlogchannel.send(embed);

  console.log(`[${channel.guild}] A ${channel.type} channel called ${channel.name} has been created.`);
  return
}
