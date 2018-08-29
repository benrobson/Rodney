const Discord = require('discord.js');
const config = require('../config.json');

module.exports = (oldMessage, newMessage) => {
  let auditlogchannel = omsg.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return;

  let embed = new Discord.RichEmbed()
  .addField(`Message Edited in ${newMessage.channel.name}.`, `${newMessage.author.username}:\n Old Message: ${oldMessage.content}\n ${newMessage.content}`)
  auditlogchannel.send(embed);

  console.log(`[${newMessage.guild}] A message sent by ${newMessage.author.username} has been deleted: ${newMessage.content}.`);
  return
}
