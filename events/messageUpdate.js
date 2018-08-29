const Discord = require('discord.js');
const config = require('../config.json');

module.exports = (oldmsg, newmsg) => {
  let auditlogchannel = omsg.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return;

  let embed = new Discord.RichEmbed()
  .addField(`Message Edited in ${newmsg.channel.name}.`, `${newmsg.author.username}:\n Old Message: ${oldmsg.content}\n ${newmsg.content}`)
  auditlogchannel.send(embed);

  console.log(`[${newmsg.guild}] A message sent by ${newmsg.author.username} has been deleted: ${newmsg.content}.`);
  return
}
