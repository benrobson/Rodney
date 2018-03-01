const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let reason = args.join(' ').slice(22);
  if(!user) return message.channel.send('Sorry, I couldn\'t find that user.');

  let embed = new Discord.RichEmbed()
  .setDescription('**Incoming Report!**')
  .setColor(config.reportembedcolor)
  .addField('Reported User', `${user} with ID: ${user.id}`)
  .addField('Reported By:', `${message.author} with ID: ${message.author.id}`)
  .addField('Reported in Channel:', message.channel)
  .addField('Time:', message.createdAt)
  .addField('Reason:', reason);

  let reportschannel = message.guild.channels.find('name', 'reports');
  if (!reportschannel) return message.channel.send('Sorry, I couldn\'t find the Reports Channel, unable to send this report. \n Please alert your server Administrator to create a #reports channel to use this command.');

  message.delete().catch(O_o=>{});
  reportschannel.send(embed);
  return;
}

module.exports.help = {
  name: 'report'
}
