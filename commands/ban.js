const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('This user could not be found, or does not exist.');
    message.channel.send(embed);
    return
  };
  if (!message.member.hasPermission('BAN_MEMBERS')){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('You do not have sufficent permissions to use this command.');
    message.channel.send(embed);
    return
  };
  let reason = args.join(' ').slice(22);
  if (!reason){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('There is no reason for this punishment, please provide a reason.');
    message.channel.send(embed);
    return
  };
  if (!message.member.hasPermission('MANAGE_MEMBERS')){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('You do not have sufficent permissions to use this command.');
    message.channel.send(embed);
    return
  };
  if (user.hasPermission('MANAGE_MESSAGES')){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('This user cannot be banned.');
    message.channel.send(embed);
    return
  };

  let embed = new Discord.RichEmbed()
  .setTitle('User has been Banned')
  .setColor(config.banembedcolor)
  .addField('Banned User', `${user} with ID: ${user.id}`)
  .addField('Banned By:', `${message.author} with ID: ${message.author.id}`)
  .addField('Banned in Channel:', message.channel)
  .addField('Time:', message.createdAt)
  .addField('Reason:', reason);

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) {
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('A `#audit-log` channel channel could not be found, the punishment notification could not be sent.');
    message.channel.send(embed);
    return
  }

  message.guild.member(user).ban(reason);
  message.delete().catch(O_o=>{});
  auditlogchannel.send(embed);
  return;
};

module.exports.help = {
  name: 'ban',
  description: 'This will permantly ban a user.',
  usage: 'ban [@user] [reason]'
};
