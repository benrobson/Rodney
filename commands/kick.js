const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user) return message.channel.send('Sorry, I couldn\'t find that user.');
  let reason = args.join(' ').slice(22);
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Insuffenient Permissions.');
  if (user.hasPermission('MANAGE_MESSAGES')) return message.channel.send('This user cannot be kicked.');

  let embed = new Discord.RichEmbed()
  .setDescription('**User has been Kicked**')
  .setColor(config.reportembedcolor)
  .addField('Kicked User', `${user} with ID: ${user.id}`)
  .addField('Kicked By:', `${message.author} with ID: ${message.author.id}`)
  .addField('Kicked in Channel:', message.channel)
  .addField('Time:', message.createdAt)
  .addField('Reason:', reason);

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!reportschannel) return message.channel.send('Sorry, I couldn\'t find the Audit Log Channel, unable to send this punishment notification.');

  message.guild.member(user).kick(reason);
  message.delete().catch(O_o=>{});
  auditlogchannel.send(embed);
}

module.exports.help = {
  name: 'kick'
}
