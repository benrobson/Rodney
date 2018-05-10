const Discord = require('discord.js');
const config = require('../config.json');

module.exports = (message) => {
  let createdAtRaw = message.createdAt.toDateString();
  let createdAt = createdAtRaw.split(" ");

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return;

  let embed = new Discord.RichEmbed()
  .setTitle('A messsage has been deleted.')
  .setColor(config.yellow)
  .addField('Sent By', message.author, true)
  .addField('Deleted in', message.channel, true)
  .addField('Sent At', `${createdAt[0]} ${createdAt[2]} ${createdAt[1]}`)
  .addField('Message Content', message.content)
  auditlogchannel.send(embed);

  console.log(`[${message.guild}] A message sent by ${message.author.username} has been deleted: ${message.content}.`);
  return
}
