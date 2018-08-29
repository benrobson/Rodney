const Discord = require('discord.js');
const config = require('../config.json');

module.exports = (omsg, nmsg) => {
  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return;

  let embed = new Discord.RichEmbed()
  .addField(`Message Edited in ${message.channel.name}.`, `${message.author.username}:\n Old Message: ${omsg.content}\n ${nmsg.content}`)
  auditlogchannel.send(embed);

  console.log(`[${message.guild}] A message sent by ${message.author.username} has been deleted: ${message.content}.`);
  return
}
