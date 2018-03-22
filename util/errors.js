const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

// Used if there is no #audit-log channel in the guild
module.exports.noLogChannel = (message, perm) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setColor(config.red)
  .setDescription('Sorry, I could not find the `#audit-log` channel. This notification was unable to be sent!');

  message.channel.send(embed).then(message => message.delete(config.errortimeout));
};

// Used if there is no #reports channel in the guild
module.exports.noReportChannel = (message, perm) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setColor(config.red)
  .setDescription('Sorry, I could not find the `#reports` channel. This report was unable to be sent!');

  message.channel.send(embed).then(message => message.delete(config.errortimeout));
};


// Used if user has no permissions to execute the command
module.exports.noPermissions = (message, perm) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setDescription(`You have insufficent permissions to run this command.\nYou require the permission flag of **${perm}**!`)
  .setColor(config.red)

  message.channel.send(embed).then(message => message.delete(config.errortimeout));
};

// Used if no user has been provided or if user is invalid
module.exports.invalidUser = (message) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setDescription('This user could not be found or does not exist!')
  .setColor(config.red);

  message.channel.send(embed).then(message => message.delete(config.errortimeout));
};

// Used if no reason has been provided
module.exports.invalidReason = (message) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setDescription('No reason has been provided.')
  .setColor(config.red);

  message.channel.send(embed).then(message => message.delete(config.errortimeout));
};

// Used for users that cannot be punished
module.exports.cannotPunish = (message) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setDescription('This user cannot be punished.')
  .setColor(config.red);

  message.channel.send(embed).then(message => message.delete(config.errortimeout));
};

// Used if a user attempts to send an empty poll
module.exports.invalidPoll = (message) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setDescription('Please provide a question for your poll.')
  .setColor(config.red);

  message.channel.send(embed).then(message => message.delete(config.errortimeout));
};

// Used if a user does not specify a number of messages to purge
module.exports.provideNumber = (message) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setDescription('Please provide a number of messages you would like to delete.')
  .setColor(config.red);

  message.channel.send(embed).then(message => message.delete(config.errortimeout));
};
