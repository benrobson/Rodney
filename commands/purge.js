const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES')){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('You do not have sufficent permissions to use this command.');
    message.channel.send(embed);
    return
  };

  if (!args[0]){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('Please specify a number.');
    message.channel.send(embed);
    return
  };

  message.channel.bulkDelete(args[0]).then(() => {
    let embed = new Discord.RichEmbed()
    .setTitle('Messages Cleared!')
    .setColor(config.green)
    .setDescription(`Cleared ${args[0]} messages.`)
    message.channel.send(embed).then(msg => msg.delete(5000));
    return
  })

  let embed = new Discord.RichEmbed()
  .setTitle('Messages Purged!')
  .setColor(config.green)
  .addField('Kicked By:', `${message.author} with ID: ${message.author.id}`)
  .addField('Channel:', message.channel)
  .addField('Time:', message.createdAt)

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('Sorry, I couldn\'t find the Audit Log Channel, unable to send the purge notification.');
    message.channel.send(embed);
    return
  };

  auditlogchannel.send(embed);
  return
};

module.exports.help = {
  name: 'purge',
  description: 'This allows messages to be cleared from a channel.',
  usage: 'purge [number of messages]'
};
