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

  if (user.roles.has(guildRole.id)) return message.reply('That role does exist!');
  await (user.addRole(guildRole.id));

  let embed = new Discord.RichEmbed()
  .setTitle('User has been assigned to a role.')
  .setColor(config.green)
  .addField('Assigned User:', `${user}`)
  .addField('Assigned By:', `${message.author}`)
  .addField('Assigned Role:', `${role}`);

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('Sorry, I couldn\'t find the Audit Log Channel, unable to send this punishment notification.');
    message.channel.send(embed);
    return
  };

  auditlogchannel.send(embed);
  return
};

module.exports.help = {
  name: 'addrole',
  description: 'This will add a role to the mentioned user.',
  usage: 'addrole [user] [role]'
};
