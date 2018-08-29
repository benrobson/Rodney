const Discord = require('discord.js');
const config = require('../config.json');

module.exports = (oldMessage, newMessage) => {
  let auditlogchannel = newMessage.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return;

  if (newMessage.author.bot) return;

  let embed = new Discord.RichEmbed()
  .setColor(orange)
  .addField(`Message Edited in #${newMessage.channel.name}.`, `${newMessage.author.username}\n Old Message: ${oldMessage.content} -> ${newMessage.content}`)
  auditlogchannel.send(embed);

  console.log(`[${newMessage.guild}] A message sent by ${newMessage.author.username} has been deleted: ${newMessage.content}.`);
  return
}
