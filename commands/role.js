const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_ROLES')) return errors.noPermissions(message, 'MANAGE_ROLES');

  let user = message.guild.member(message.mentions.members.first());
  if (!user) return errors.invalidUser(message);

  let role = args.slice(1).join(" ");
  if (!role) return message.reply('Please specify a role.');
  let guildRole = message.guild.roles.find('name', role);
  if (!role) return message.reply('Couldn\'t find that role.');

  if (!args[1]) return message.channel.send('Add Args [Add or Remove]');

  if (message.content === 'add') {
    if (user.roles.has(guildRole.id)) return message.reply('That role does exist!');
    await (user.addRole(guildRole.id));

    let embed = new Discord.RichEmbed()
    .setTitle('User has been assigned to a role.')
    .setColor(config.green)
    .addField('Assigned User', `${user}`, true)
    .addField('Assigned By', `${message.author}`, true)
    .addField('Assigned Role', `${role}`, true);

    message.channel.send(embed);

    console.log(`[${message.guild}] ${message.author.username} has assigned the role ${guildRole.name} to ${user.user.username}.`);
  };

  if (message.content === 'remove') {
    if (user.roles.has(guildRole.id)) return message.reply('That role does exist!');
    await (user.addRole(guildRole.id));

    let embed = new Discord.RichEmbed()
    .setTitle('User has been assigned to a role.')
    .setColor(config.green)
    .addField('Assigned User', `${user}`, true)
    .addField('Assigned By', `${message.author}`, true)
    .addField('Assigned Role', `${role}`, true);

    message.channel.send(embed);

    console.log(`[${message.guild}] ${message.author.username} has assigned the role ${guildRole.name} to ${user.user.username}.`);
  };
};

module.exports.help = {
  name: 'role',
  description: 'This will add or remove a role from the mentioned user.',
  usage: 'role [add/remove] [user] [role]'
};
