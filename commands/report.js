const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user) {
    const embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('The user you have requested to punish could not be found or a reason has not been supplied for this report.');
    message.channel.send(embed);
    message.delete().catch(O_o=>{});
  };
  let reason = args.join(' ').slice(22);

  let embed = new Discord.RichEmbed()
  .setTitle('Incoming Report!')
  .setColor(config.reportembedcolor)
  .addField('Reported User', `${user} with ID: ${user.id}`)
  .addField('Reported By:', `${message.author} with ID: ${message.author.id}`)
  .addField('Reported in Channel:', message.channel)
  .addField('Time:', message.createdAt)
  .addField('Reason:', reason);

  let reportschannel = message.guild.channels.find('name', 'reports');
  if (!reportschannel) {
  const embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setColor(config.errorembedcolor)
  .setDescription('A `#reports` channel could not be found!\nPlease contact your guild/server Administrator to create one.');
  message.channel.send(embed);
  };

  message.delete().catch(O_o=>{});
  reportschannel.send(embed);
  return;
}

module.exports.help = {
  name: 'report'
}
