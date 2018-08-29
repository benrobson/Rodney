const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  if (args == 'help') {
    let embed = new Discord.RichEmbed()
    .setTitle(`${module.exports.help.name} Command Information`)
    .setDescription(`${module.exports.help.description}`)
    .addField('Usage', `${config.prefix}${module.exports.help.usage}`, true)
    .addField('Permission', `${module.exports.help.permission}`, true)
    .setColor(config.cyan)
    message.channel.send(embed);
    return
  };

  if (message.author.id !== `${config.ownerid}`) return errors.ownersOnly(message);

  if (message.author.id == `${config.ownerid}`){
    let embed = new Discord.RichEmbed()
    .setTitle(`It's time for ${client.user.username} to go!!!`)
    .setColor(config.red)
    .setDescription('Leaving Guild...')
    message.channel.send(embed);

    message.guild.leave();
    return
  }
};

module.exports.help = {
  name: 'terminate',
  description: 'Will make the bot leave the Discord guild and terminate it\'s instance.',
  permission: 'BOTOWNER',
  usage: 'terminate'
};
