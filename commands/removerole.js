const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply('Insufficent Permissions.');
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return message.reply('Couldn\'t find that user.');

  let role = args.join(' ').slice(22);
  if (!role) return message.reply('Please specify a role.');
  let guildRole = message.guild.roles.find('name', role);
  if (!role) return message.reply('Couldn\'t find that role.');

  if (!user.roles.has(guildRole.id)) return message.reply('That role does not exist');
  await (user.removeRole(guildRole.id));
}

module.exports.help = {
  name: 'removerole'
}
