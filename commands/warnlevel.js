const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file
const fs = require('fs'); // this is the 'File System' that reads all of the commands in the commands folder
const ms = require('ms'); // this package allows us to use time
let warns = JSON.parse(fs.readFileSync('./warnings.json', 'utf8')); // this links to the warnings.json file

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Insufficent Permissions!');
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return message.reply('This user cannot be found.');

  let embed = new Discord.RichEmbed()
  .setTitle(`**Warning Profile for ${user}**`)
  .setColor(config.plainembedcolor)
  .addField('User', `${user} with ID: ${user.id}`)
  .addField('Number Of Warnings:', `**${warns[user.id].warns}**`)

  message.channel.send(embed);
}

module.exports.help = {
  name: 'warnlevel'
}
