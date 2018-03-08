const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file
const fs = require('fs'); // this is the 'File System' that reads all of the commands in the commands folder
const ms = require('ms'); // this package allows us to use time
let warns = JSON.parse(fs.readFileSync('./warnings.json', 'utf8')); // this links to the warnings.json file

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Insufficent Permissions!');
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user){
    const embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('No user could not be found.');
    message.channel.send(embed);
    return
  };

  let embed = new Discord.RichEmbed()
  .setTitle(`Warning Profile for ${user}`)
  .setColor(config.plainembedcolor)
  .addField('User', `${user} with ID: ${user.id}`)
  .addField('Number Of Warnings:', `**${warns[user.id].warns}**`)
  message.channel.send(embed);
  return
}

module.exports.help = {
  name: 'warnlevel',
  description: 'Checks a users warn level, to see where they are on the Automatic Escalation System',
  usage: 'warnlevel [user]'
}
