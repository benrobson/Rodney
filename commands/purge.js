const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');
const chalk = require('chalk');

module.exports.run = async (client, message, args) => {
  if (args == 'help') {
    let embed = new Discord.RichEmbed()
    .setTitle(`${module.exports.help.name} Command Information`)
    .setDescription(`${module.exports.help.description}`)
    .addField('Usage', `${config.prefix}${module.exports.help.usage}`, true)
    .addField('Permission', `${module.exports.help.permission}`, true)
    .setColor(config.cyan)
    message.channel.send(embed);
    return
  };

  if (!message.member.hasPermission(`${module.exports.help.permission}`)) return errors.noPermissions(message, `${module.exports.help.permission}`);

  if (isNaN(args[0])) return errors.provideNumber(message);
  if (args[0] > 100) return errors.anotherNumber(message);

  message.channel.bulkDelete(args[0]).then(() => {
    let embed = new Discord.RichEmbed()
    .setTitle('Messages Cleared!')
    .setColor(config.green)
    .setDescription(`Deleted ${args[0]} messages.`)
    message.channel.send(embed).then(message.delete(5000));
    return
  })

  let createdAtRaw = message.createdAt.toDateString();
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
  console.log(chalk.yellow(`[${message.guild}]`) + ` ${args} messages have been purged from ${message.channel.name} by ${message.author.username}`);
  return
};

module.exports.help = {
  name: 'purge',
  description: 'This allows messages to be deleted from a channel.',
  permission: 'MANAGE_MESSAGES',
  usage: 'purge [number of messages [max 100]]'
};
