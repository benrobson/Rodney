const Discord = require('discord.js');
const config = require('../config.json');

module.exports = (oldMessage, newMessage) => {
  let auditlogchannel = newMessage.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return;

  if (newMessage.author.bot) return;

  let embed = new Discord.RichEmbed()
  .setColor(config.orange)
  .addField(`Message Edited in #${newMessage.channel.name} by ${newMessage.author.username}`, `${oldMessage.content} **->** ${newMessage.content}`)
  auditlogchannel.send(embed);

  console.log(`[${newMessage.guild}] A message in #${newMessage.channel.name} has been edited by ${newMessage.author.username}\n${oldMessage.content} -> ${newMessage.content}`);
  return
}
