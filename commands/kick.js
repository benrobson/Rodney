const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user) {
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('The user you want to kick cannot be found.');
    message.channel.send(embed);
    return
  };
  let reason = args.join(' ').slice(22);
  if (!message.member.hasPermission('MANAGE_MESSAGES')){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('You do not have sufficent permissions to use this command.');
    message.channel.send(embed);
    return
  };
  if (user.hasPermission('MANAGE_MESSAGES')){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('This user cannot be kicked.');
    message.channel.send(embed);
    return
  };

  let embed = new Discord.RichEmbed()
  .setTitle('User has been Kicked')
  .setColor(config.blue)
  .addField('Kicked User:', `${user} with ID: ${user.id}`)
  .addField('Kicked By:', `${message.author} with ID: ${message.author.id}`)
  .addField('Kicked in Channel:', message.channel)
  .addField('Time:', message.createdAt)
  .addField('Reason:', reason);

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('Sorry, I couldn\'t find the Audit Log Channel, unable to send this punishment notification.');
    message.channel.send(embed);
    return
  };

  message.guild.member(user).kick(reason);
  message.delete().catch(O_o=>{});
  auditlogchannel.send(embed);
  return
};

module.exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user from the guild/server.',
  usage: 'kick [user] [reason]'
};
