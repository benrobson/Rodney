const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return errors.noPermissions(message, 'MANAGE_MESSAGES');

  if (!args[0]) return errors.provideNumber(message);

  message.channel.bulkDelete(args[0]).then(() => {
    let embed = new Discord.RichEmbed()
    .setTitle('Messages Cleared!')
    .setColor(config.green)
    .setDescription(`Deleted ${args[0]} messages.`)
    message.channel.send(embed).then(message.delete(5000));
    return
  })

  let createdAtRaw = guild.createdAt.toDateString();
  let createdAt = createdAtRaw.split(' ');

  let embed = new Discord.RichEmbed()
  .setTitle('Messages Purged!')
  .setColor(config.green)
  .addField('Purged By', `${message.author}`, true)
  .addField('Number of Messages', args, true)
  .addField('Channel', message.channel, true)
  .addField('Time', `${createdAt[0]} ${createdAt[2]} ${createdAt[1]} ${createdAt[3]}`)

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return errors.noLogChannel(message);

  auditlogchannel.send(embed);
  return
};

module.exports.help = {
  name: 'purge',
  description: 'This allows messages to be deleted from a channel.',
  usage: 'purge [number of messages]'
};
