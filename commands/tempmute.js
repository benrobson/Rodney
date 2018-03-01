const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file
const ms = require('ms'); // this package allows us to use time

module.exports.run = async (client, message, args) => {

  let user = message.guild.member(messgae.mentions.users.first() || message.guild.members.get(args[0]));
  if (user) return message.reply('User could not be found');
  if(user.hasPermission('MESSAGE_MESSAGES ')) return message.reply('This user cannot be muted.');

}

module.exports.help = {
  name: 'tempmute'
}
