const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES')){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('You do not have sufficent permissions to use this command.');
    message.channel.send(embed);
    return
  };
  if (!args[0]){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('Please specify a number.');
    message.channel.send(embed);
    return
  };

  message.channel.bulkDelete(args[0]).then(() => {
    let embed = new Discord.RichEmbed()
    .setTitle('Messages Cleared!')
    .setColor(config.joinembedcolor)
    .setDescription(`Cleared ${args[0]} messages.`)
    message.channel.send(embed).then(msg => msg.delete(5000));
    return
  })
};

module.exports.help = {
  name: 'purge',
  description: 'This allows messages to be cleared from a channel.',
  usage: 'purge [number of messages]'
};
