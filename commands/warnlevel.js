const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs');
const ms = require('ms');
const errors = require('../util/errors.js');
let warns = JSON.parse(fs.readFileSync('./warnings.json', 'utf8'));

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return errors.noPermissions(message, 'MANAGE_MESSAGES');

  let user = message.guild.member(message.mentions.members.first());
  if (!user) return errors.invalidUser(message);

  if (warns[user.id].warns === null){
    const embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('This user has no warnings in the system.');
    message.channel.send(embed);
    return
  }

  let embed = new Discord.RichEmbed()
  .setTitle(`Warning Profile for ${user.displayName}`)
  .setColor(config.white)
  .addField('User', `${user}`, true)
  .addField('Number Of Warnings', `**${warns[user.id].warns}**`, true)
  message.channel.send(embed);
  return
};

module.exports.help = {
  name: 'warnlevel',
  description: 'Checks a users warn level.',
  usage: 'warnlevel [@user]'
};
