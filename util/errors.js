const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.noLogChannel = (message, perm) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setColor(config.red)
  .setDescription('Sorry, I could not find the Audit Log Channel. This notification was unable to be sent!');

  message.channel.send(embed).then(message => message.delete(config.errortimeout));
};

module.exports.noPermissions = (message, perm) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setDescription(`You have insufficent permissions to run this command. You require the permission flag of **${perm}**!`)
  .setColor(config.red)

  message.channel.send(embed).then(message => message.delete(config.errortimeout));
};

module.exports.invalidUser = (message) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setDescription('This user could not be found or does not exist!')
  .setColor(config.red);

  message.channel.send(embed).then(message => message.delete(config.errortimeout));
};

module.exports.invalidReason = (message) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setDescription('No reason has been provided.')
  .setColor(config.red);

  message.channel.send(embed).then(message => message.delete(config.errortimeout));
};
