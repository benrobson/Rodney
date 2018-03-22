const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file
const fs = require('fs'); // this is the 'File System' that reads all of the commands in the commands folder
const ms = require('ms'); // this package allows us to use time
let warns = JSON.parse(fs.readFileSync('./warnings.json', 'utf8')); // this links to the warnings.json file

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES')){
    const embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('You have insufficent permissions.');
    message.channel.send(embed);
    return
  };
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user){
    const embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('No user could not be found.');
    message.channel.send(embed);
    return
  };

  if (warns[user.id].warns === 0){
    const embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('This user has no warnings in the system.');
    message.channel.send(embed);
    return
  };

  let embed = new Discord.RichEmbed()
  .setTitle(`Warning Profile for ${user.displayName}`)
  .setColor(config.white)
  .addField('User', `${user} with ID: ${user.id}`)
  .addField('Number Of Warnings:', `**${warns[user.id].warns}**`)
  message.channel.send(embed);
  return
};

module.exports.help = {
  name: 'warnlevel',
  description: 'Checks a users warn level.',
  usage: 'warnlevel [@user]'
};
